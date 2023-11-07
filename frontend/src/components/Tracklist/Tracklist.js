import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePlaylistFromTracks from '../CreatePlaylistFromTracks/CreatePlaylistFromTracks';
import { DeleteButton, TrackListContainer, TrackListItem, TrackTitelWrapper } from "../../styles";

function TrackList() {
    const [tracklist, setTracklist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracklist/list`);
                // Ensure the data is in the format of an array before setting it
                setTracklist(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("An error occurred while fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const removeTrack = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/tracklist/remove`, { data: { id } });
            // Refetch the tracklist after removing a track
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracklist/list`);
            setTracklist(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("An error occurred while removing a track: ", error);
        }
    };

    // Since `tracklist` is ensured to be an array, this should no longer throw an error
    const trackIds = tracklist.map(track => track.id);

    return (
        <TrackListContainer>
            <TrackTitelWrapper>New Playlist</TrackTitelWrapper>
            <ul>
                {tracklist.map(track => (
                    <TrackListItem key={track.id}>
                        {track.name} <DeleteButton onClick={() => removeTrack(track.id)}>X</DeleteButton>
                    </TrackListItem>
                ))}
            </ul>
            <CreatePlaylistFromTracks trackIds={trackIds} />
        </TrackListContainer>
    );
}

export default TrackList;
