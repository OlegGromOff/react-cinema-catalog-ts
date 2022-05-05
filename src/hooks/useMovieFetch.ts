import { useState, useEffect } from "react";
import API, { Movie, Cast, Crew } from "../API";
//Helpers
import { isPersistedState } from "../helpers";
//Types
export type MovieState = Movie & { actors: Cast[], directors: Crew[] };

export const useMovieFetch = (movieId: any) => {
    const [state, setState] = useState<MovieState>({} as MovieState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                //Get directors only
                const directors = credits.crew.filter( // .crew and .job are prop from DB
                    member => member.job === 'Director'
                );

                setState({ // info about movie
                    ...movie,
                    actors: credits.cast,
                    directors
                });

                setLoading(false);
            }
            catch (error) {
                setError(true);
            }
        }

        const sessionState = isPersistedState(movieId);

        if (sessionState) {
            setState(sessionState); // get info about movie from localStorage
            setLoading(false)
            return;
        }

        fetchMovie();
    }, [movieId]);

    //Write to sessionStorage
    useEffect(() => {
        if (state.original_title)
            localStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state])

    return { state, loading, error };
}