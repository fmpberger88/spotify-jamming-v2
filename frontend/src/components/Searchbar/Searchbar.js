import React, { useState } from 'react';
import axios from 'axios';
import {SearchButton, SearchContainer, SearchInput} from "../../styles";

const Searchbar = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);  // Reset error

        if (!query.trim()) {
            setError('Die Suchanfrage darf nicht leer sein.');
            setIsLoading(false);
            return;
        }

        try {
            // Hier rufen wir direkt die Spotify-API oder Ihren lokalen Server auf, je nachdem, was Sie bevorzugen
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/spotify/search`, {
                params: { type: "tracks", term: query.trim() },
                withCredentials: true
            });
            setSearchResults(response.data)// Beachten Sie die Datenstruktur, es sollte `tracks` sein, nicht `track`
            setIsLoading(false);
        } catch (error) {
            setError('Ein Fehler ist aufgetreten. :)');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SearchContainer>
            <SearchInput
                id="searchField"
                name="searchField"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for tracks"
            />
            <SearchButton onClick={handleSearch}>Search for Tracks</SearchButton>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </SearchContainer>
    );
};

export default Searchbar;
