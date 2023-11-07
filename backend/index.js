require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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

// Initialize session storage with MongoDB.
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI // Your MongoDB connection string
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
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

// Middleware to refresh the access token if needed
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
// app.use(errorHandling); // Uncomment and define this middleware as needed

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
