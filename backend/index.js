require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
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

// Passport configuration
require('./config/passport')(passport);

const app = express();

// Initialize client.
const redisClient = createClient({
    url: process.env.REDIS_URL // Provide your Redis server URL here
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().catch(console.error);

// Initialize store.
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'jamming:'
});

// Initialize session storage.
app.use(session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET, // Use a secure secret from your environment variables
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Configure CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Use JSON middleware
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(refreshAccessTokenIfNeeded);

// Health check endpoint
app.get('/health', (req, res) => {
    res.sendStatus(200);
});

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

// Error Handling Middleware
// app.use(errorHandling);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
