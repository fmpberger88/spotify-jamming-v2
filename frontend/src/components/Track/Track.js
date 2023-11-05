import React from 'react';
import axios from "axios";
import {AddButton, TrackArtist, TrackContainer, TrackImage, TrackName} from "../../styles";

const Track = ({ track, addToTracklist }) => {
    const playTrack = async () => {
        try {
            await axios.post(`http://localhost:3001/api/spotify/play`, {
                trackUri: track.uri
            }, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Error playing track: ', error);
        }
    }

    return (
        <TrackContainer>
            <TrackImage src={track.album.images[0].url} alt={track.album.name} />
            <TrackName>{track.name}</TrackName>
            <TrackArtist>{track.artists[0].name}</TrackArtist>
            <button onClick={playTrack}>Play</button>
            {addToTracklist && <AddButton onClick={() => addToTracklist(track)}>Add</AddButton>}
        </TrackContainer>
    );
};

export default Track;

