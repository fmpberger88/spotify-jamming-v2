import React, { useState } from 'react';
import axios from 'axios';
import {CreatePlaylistWrapper, StyledButton, StyledInput, StyledLabel} from "../../styles";

function CreatePlaylistFromTracks( {trackIds} ) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isCollaborative, setIsCollaborative] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const createPlaylist = async () => {
        console.log(trackIds);
        if (!trackIds || !trackIds.length) {
            setError('Error: No tracks to add');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/spotify/create', {
                name: playlistName,
                description: playlistDescription,
                public: isPublic,
                collaborative: isCollaborative,
                tracklist: trackIds
            }, {
                withCredentials: true
            });

            setSuccess('Playlist successfully created')
        } catch (error) {
            setError(`Error creating playlist: ${error.message}`);
        }
    }

    return (
        <CreatePlaylistWrapper>
            {error && <p>Error: {error}</p>}
            {success && <p>{success}</p>}
            <StyledInput
                type="text"
                placeholder="Playlist name"
                value={playlistName}
                onChange={e => setPlaylistName(e.target.value)}
            />
            <StyledInput
                type="text"
                placeholder="Playlist description"
                value={playlistDescription}
                onChange={e => setPlaylistDescription(e.target.value)}
            />
            <StyledLabel>
                Public:
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                />
            </StyledLabel>
            <StyledLabel>
                Collaborative
                <input
                    type="checkbox"
                    checked={isCollaborative}
                    onChange={e => setIsCollaborative(e.target.checked)}
                />
            </StyledLabel>
            <StyledButton onClick={createPlaylist}>Create Playlist</StyledButton>
        </CreatePlaylistWrapper>
    );
}

export default CreatePlaylistFromTracks;