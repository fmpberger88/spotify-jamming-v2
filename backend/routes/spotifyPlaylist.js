const express = require('express');
const axios = require('axios');
const spotifyPlaylistRouter = express.Router();

spotifyPlaylistRouter.get('/playlist', async (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    // Check if an access token is available
    if (!req.user || !req.user.accessToken) {
        return res.status(401).send('Unauthorized - No access token');
    }

    try {
        // Get the userId
        const userId = req.user.id;
        // Get the playlists
        const response = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        // Send response back to client
        res.json(response.data);
    } catch (error) {
        console.error('Spotify Search API Error', error);
        res.status(error.response?.status || 500).send(error.response?.data || 'An error occurred.');
    }
});

spotifyPlaylistRouter.post('/create', async (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    // Check if an access token is available
    if (!req.user || !req.user.accessToken) {
        return res.status(401).send('Unauthorized - No access token');
    }

    const userId = req.user.id;
    const playListName = req.body.name;
    const tracklist = req.body.tracklist;
    const playListDescription = req.body.description;
    const isPublic = req.body.public;
    const isCollaborative = req.body.collaborative;

    // Check tracklist
    if (!tracklist || !Array.isArray(tracklist) || !tracklist.length) {
        return res.status(400).send('Bad Request: Invalid or missing trackList');
    }

    try {
        const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            name: playListName,
            description: playListDescription,
            public: isPublic,
            collaborative: isCollaborative,
        }, {
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const playlistId = response.data.id;

        // Now add tracks to the newly created playlist
        await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: tracklist.map(id => `spotify:track:${id}`)  // Convert track IDs to Spotify URIs
        }, {
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Spotify Create Playlist API Error', error);
        res.status(error.response?.status || 500).send(error.response?.data || 'An error occurred.');
    }
});

module.exports = spotifyPlaylistRouter;
