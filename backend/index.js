require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const refreshAccessTokenIfNeeded = require('./middleware/refreshAccessToken');
//const { logging } = require('./middleware/logging');
const cookieParser = require('cookie-parser');
//Routers
const authRoutes = require('./routes/auth');
const callbackRouter = require('./routes/callback');
const searchSpotifyRouter = require('./routes/searchSpotify');
const spotifyAudiobooksRouter = require('./routes/spotifyAudiobooks');
const spotifyPlaylistRouter = require('./routes/spotifyPlaylist');
const trackRouter = require('./routes/trackList');
//const errorHandling = require('./middleware/errorHandler');

// Initialize Passport
require('./config/passport')(passport);

const app = express();

// Server static files
//app.use(express.static('public'));

// add security middleware
//const helmet = require('helmet');
//app.use(helmet());

// Configure CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Use JSON middleware
app.use(express.json());

// Cookie-Parser
app.use(cookieParser());

// Use Session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(refreshAccessTokenIfNeeded);

// Logging Middleware
//app.use(logging);

//app.get('/', (req, res) => {
//    res.send('Server is running');
//});

app.get('/health', (req, res) => {
    res.sendStatus(200);
})

// neu hinzugefügt 30.10.2023
app.get('/api/auth/spotify/status', (req, res) => {
    console.log("Received request to check authentication status");
    console.log("Cookies: ", req.cookies);
    const loggedIn = req.cookies['loggedIn'] === 'true';
    console.log('Logged in status from cookies:', loggedIn);
    res.json({ loggedIn });
});




// Routes
app.use('/api/auth/spotify', authRoutes);
app.use('/callback', callbackRouter);
app.use('/api/spotify', searchSpotifyRouter);
app.use('/api/spotify', spotifyPlaylistRouter);
app.use('/api/spotify', spotifyAudiobooksRouter);
app.use('/api/tracklist', trackRouter);



// Error Handling Middleware
//app.use(errorHandling);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});