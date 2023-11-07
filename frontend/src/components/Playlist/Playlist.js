import React, { useState, useEffect } from "react";
import axios from "axios";
import {TrackListContainer, TrackListItem, TrackTitelWrapper} from "../../styles";

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/spotify/playlist`, {
                    withCredentials: true
                });
                setPlaylists(response.data.items);
            } catch (error) {
                setError(error);
            }
        };

        fetchPlaylists().catch(error => {
            console.error("An error occurred while fetching playlists: ", error);
        });
    }, []);


    return (
        <TrackListContainer>
            <TrackTitelWrapper>Your Playlists</TrackTitelWrapper>
            {error && <p>Error: {error.message}</p>}
            <ul>
                {playlists.map((playlist, index) => (
                    <TrackListItem key={index}>
                        {playlist.name}, {playlist.description}
                    </TrackListItem>
                ))}
            </ul>
        </TrackListContainer>
    );
}


export default Playlist;