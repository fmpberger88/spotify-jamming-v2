import React, { useState } from 'react';
import axios from 'axios';
import {SearchButton, SearchContainer, SearchInput} from "../../styles";

const SearchbarAudiobooks = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null); // Reset Error

        if (!query.trim()) {
            setError('Die Suchanfrage darf nicht leer sein.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/api/spotify/search-audiobooks`, {
                params: { term: query.trim() },
                withCredentials: true
            });
            setSearchResults(response.data)
            setIsLoading(false);
        } catch (error) {
            setError('Ein Fehler ist aufgetreten leider :)');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SearchContainer>
            <SearchInput
                id="searchField-Audiobooks"
                name="searchField-Audiobooks"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for Audiobooks"
            />
            <SearchButton onClick={handleSearch}>Search for Audiobooks</SearchButton>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </SearchContainer>
    )
}

export default SearchbarAudiobooks;