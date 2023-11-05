const express = require('express');
const axios = require('axios');
const spotifyAudiobooksRouter = express.Router();

spotifyAudiobooksRouter.get('/search-audiobooks', async (req, res) => {
    console.log('Search API called with term:', req.query.term);

    // Überprüfen, ob der Benutzer authentifiziert ist
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    // Überprüfen, ob ein Zugriffstoken vorhanden ist
    if (!req.user || !req.user.accessToken) {
        return res.status(401).send('Unauthorized - No access token');
    }

    const term = `${req.query.term} audiobooks`;
    const type = 'playlist,album';
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?type=${type}&q=${term}`, {
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Spotify Search API Error', error);
        res.status(error.response?.status || 500).send(error.response?.data || 'An error occurred.');
    }
})

module.exports = spotifyAudiobooksRouter;