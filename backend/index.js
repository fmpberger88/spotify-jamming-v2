require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('ioredis');
const passport = require('passport');
// Middleware
const refreshAccessTokenIfNeeded = require('./middleware/refreshAccessToken');
// Routes
const authRoutes = require('./routes/auth');
const callbackRouter = require('./routes/callback');
const searchSpotifyRouter = require('./routes/searchSpotify');
const spotifyAudiobooksRouter = require('./routes/spotifyAudiobooks');
const spotifyPlaylistRouter = require('./routes/spotifyPlaylist');
const trackRouter = require('./routes/trackList');



const app = express();

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Use an absolute path to the build directory
    const frontendPath = path.resolve(__dirname, '..', 'frontend', 'build');
    app.use(express.static(frontendPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

// Initialize Redis
// Correct initialization using Render's Redis URL
const redisClient = new redis(process.env.REDIS_URL);

//redisClient.connect().catch(console.error);


// Initialize Store
let redisStore = new RedisStore({
    client: redisClient,
})

// Session configuration
const sessionConfig = {
    store: redisStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // 1 hour
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
    }
};

app.use(session(sessionConfig));

// Passport configuration
require('./config/passport')(passport);


// Configure CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://fmpberger-jammming.onrender.com', // Stellen Sie sicher, dass diese URL korrekt ist
    credentials: true, // Um Cookies und Authentifizierungsdaten zu senden
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use JSON middleware
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(refreshAccessTokenIfNeeded);


// Check authentication status
app.get('/api/auth/spotify/status', (req, res) => {
    const isLoggedIn = req.session?.passport?.user != null;
    res.json({ loggedIn: isLoggedIn });
});

// Register routes
app.use('/api/auth/spotify', authRoutes);
app.use('/callback', callbackRouter);
app.use('/api/spotify', searchSpotifyRouter);
app.use('/api/spotify', spotifyPlaylistRouter);
app.use('/api/spotify', spotifyAudiobooksRouter);
app.use('/api/tracklist', trackRouter);

// Health check endpoint
app.get('/health', (req, res) => res.sendStatus(200));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

