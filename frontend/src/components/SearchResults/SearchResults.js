import React from "react";
import Track from '../Track/Track';
import {SearchResultsContainer} from "../../styles";

const SearchResults = ({ searchResults, addToTracklist }) => {
    return (
        <SearchResultsContainer>
            {Array.isArray(searchResults) ? searchResults.map(track => (
                <Track key={track.id} track={track} addToTracklist={addToTracklist} />
            )) : 'No tracks found'}
        </SearchResultsContainer>
    );
};



export default SearchResults;
