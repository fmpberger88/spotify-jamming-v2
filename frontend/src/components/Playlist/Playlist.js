import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrackListContainer, TrackListItem, TrackTitelWrapper } from "../../styles";

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/spotify/playlist`, {
                    withCredentials: true
                });
                // Check if items exist and is an array before setting playlists
                if (response.data && Array.isArray(response.data.items)) {
                    setPlaylists(response.data.items);
                } else {
                    // Handle cases where no items are found
                    setError("No playlists found.");
                }
            } catch (err) {
                // Capture and set only the error message
                setError(err.response?.data?.message || err.message);
                console.error("An error occurred while fetching playlists:", err);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <TrackListContainer>
            <TrackTitelWrapper>Your Playlists</TrackTitelWrapper>
            {error && <p>Error: {error}</p>}
            <ul>
                {playlists.map((playlist, index) => (
                    <TrackListItem key={index}>
                        {playlist.name}, {playlist.description || "No description"}
                    </TrackListItem>
                ))}
            </ul>
        </TrackListContainer>
    );
}

export default Playlist;
