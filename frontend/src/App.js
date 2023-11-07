/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar';
import SearchbarAudiobooks from "./components/SearchbarAudiobooks/SearchbarAudiobooks";
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Tracklist from "./components/Tracklist/Tracklist";
import { useDispatch, useSelector } from "react-redux";
import { performLogin, performLogout } from './store/authService';
import {fetchLoginStatus} from "./store/authSlice";
import {
    AppContainer,
    TitleWrapper,
    LoginButton,
    HeaderContainer,
    SearchHeader,
    LoginContainer,
    MainContentWrapper,
    SearchResultsWrapper,
    TracklistAndPlaylistWrapper
} from "./styles";

const App = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [searchResults, setSearchResults] = useState([]);
    const [tracklist, setTracklist] = useState([]);

    // Zustand initial überprüfen mit einer Thunk Action
// Zustand initial überprüfen mit einer Thunk Action
    useEffect(() => {
        console.log('Checking authentication status...');
        dispatch(fetchLoginStatus());
    }, [dispatch]);


    // Axios Interceptor für abgelaufene Tokens
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    dispatch(performLogout());
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [dispatch]);

    // Reaktion auf Änderungen des loggedIn-Status
    useEffect(() => {
        console.log('Logged in status after check:', loggedIn);
    }, [loggedIn]);

    const addToTracklist = async (track) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tracklist/add`, { track });
            setTracklist([...tracklist, response.data]);
        } catch (error) {
            console.error('Failed to add track to tracklist:', error);
        }
    };


    return (
        <AppContainer>
            <HeaderContainer>
                <LoginContainer>
                    {!loggedIn ? (
                        <LoginButton onClick={() => dispatch(performLogin())}>Login with Spotify</LoginButton>
                    ) : (
                        <LoginButton onClick={() => dispatch(performLogout())}>Logout</LoginButton>
                    )}
                </LoginContainer>
                <div>
                    <TitleWrapper>Jammming App</TitleWrapper>
                </div>
            </HeaderContainer>
            <SearchHeader>
                <Searchbar setSearchResults={setSearchResults} />
                <SearchbarAudiobooks setSearchResults={setSearchResults} />
            </SearchHeader>
            <MainContentWrapper>
                <SearchResultsWrapper>
                    <SearchResults searchResults={searchResults} addToTracklist={addToTracklist} />
                </SearchResultsWrapper>
                <TracklistAndPlaylistWrapper>
                    <Tracklist tracklist={tracklist} setTracklist={setTracklist} />
                    <Playlist />
                </TracklistAndPlaylistWrapper>
            </MainContentWrapper>
        </AppContainer>
    );
};

export default App;
