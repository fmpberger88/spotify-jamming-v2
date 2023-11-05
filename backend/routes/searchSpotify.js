const express = require('express');
const axios = require('axios');
const searchSpotifyRouter = express.Router();


searchSpotifyRouter.get('/search', async (req, res) => {
    console.log('Search API called with term:', req.query.term);

    // Überprüfen, ob der Benutzer authentifiziert ist
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    // Überprüfen, ob ein Zugriffstoken vorhanden ist
    if (!req.user || !req.user.accessToken) {
        return res.status(401).send('Unauthorized - No access token');
    }

    const term = req.query.term;
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data.tracks.items);
    } catch (error) {
        console.error('Spotify Search API Error:', error);
        res.status(error.response?.status || 500).send(error.response?.data || 'An error occurred.');
    }
});




searchSpotifyRouter.post('/play', async (req, res) => {
    console.log('Is Authenticated:', req.isAuthenticated());
    console.log('User:', req.user);
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized')
    }

    const trackUri = req.body.trackUri;

    try {
        await axios.post('https://api.spotify.com/v1/me/player/play',
            { uris: [trackUri] },
            {
                headers: {
                    'Authorization': `Bearer ${req.user.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        res.status(204).send();
    } catch (error) {
        console.error('Spotify Play API Error: ', error);
        res.status(error.response?.status || 500).send(error.response?.data || 'An error occurred.');
    }
})

module.exports = searchSpotifyRouter;