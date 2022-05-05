import { useState, useEffect } from 'react';
// API
import API, { Movie } from '../API';
// Helpers
import { isPersistedState } from '../helpers'; // state from localStorage (i use them if data in API was not changed)

const initialState = {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page: number, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    //initial and search
    useEffect(() => {
        if (!searchTerm) { // if search field is empty
            const sessionState = isPersistedState('homeState'); // state from localStorage (i use them if data in API was not changed)

            if (sessionState) {
                console.log("Grabbing from localStorage");
                setState(sessionState);
                return;
            }
        }
        console.log("Grabbing from API");
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //Load More
    useEffect(() => {
        if (!isLoadingMore) return; // return if false

        fetchMovies(state.page + 1, searchTerm); // load next page and show searchTerm if it is
        setIsLoadingMore(false);

    }, [isLoadingMore, searchTerm, state.page]);

    //Write to localStorage
    useEffect(() => {
        if (!searchTerm && state.page) localStorage.setItem('homeState', JSON.stringify(state)); // if search field is empty and state is not empty
    }, [searchTerm, state])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };

}