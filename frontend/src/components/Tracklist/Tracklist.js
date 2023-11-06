import React, { useEffect } from 'react';
import axios from 'axios';
import CreatePlaylistFromTracks from '../CreatePlaylistFromTracks/CreatePlaylistFromTracks';
import { DeleteButton, TrackListContainer, TrackListItem, TrackTitelWrapper} from "../../styles";

function TrackList({ tracklist, setTracklist }) {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tracklist/list');
            setTracklist(response.data);
        } catch (error) {
            console.error("An error occurred while fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const removeTrack = async (id) => {
        try {
            await axios.delete('http://localhost:3001/api/tracklist/remove', { data: { id } });
            await fetchData(); // Aktualisiere die Trackliste vom Server
        } catch (error) {
            console.error("An error occurred while removing a track: ", error);
        }
    };

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
