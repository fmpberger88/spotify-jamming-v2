const express = require('express');
const trackRouter = express.Router();

let trackList = [];

// Add a track to the tracklist
trackRouter.post('/add', (req, res) => {
    const track = req.body.track;

    // Validation: Check if track already exists
    const existingTrack = trackList.find(t => t.id === track.id);
    if (existingTrack) {
        return res.status(409).json({ message: 'Track already exists' });
    }

    trackList.push(track);
    res.status(201).json(track);
});

// Remove a track from the tracklist
trackRouter.delete('/remove', (req, res) => {
    const trackId = req.body.id;
    const index = trackList.findIndex(t => t.id === trackId);

    if (index > -1) {
        const removed = trackList.splice(index, 1);
        return res.status(200).json(removed[0]);
    }

    // Idempotent DELETE operation
    res.status(200).json({ message: 'Track not found, but request is idempotent' });
});

// List all tracks
trackRouter.get('/list', (req, res) => {
    console.log('Track list:', trackList);
    res.status(200).json(trackList);
});

module.exports = trackRouter;
