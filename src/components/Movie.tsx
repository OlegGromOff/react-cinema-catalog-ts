import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
//Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
//Image
import NoImage from '../images/no_image.jpg'

type MoviType = {
    movieId: string
}


const Movie: React.FC = () => {

    const { movieId } = useParams(); // get id from url

    const { state: movie, loading, error } = useMovieFetch(movieId); // (state: movie) - get info about movie

    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong...</div>;

    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Grid header='Actors' >
                {movie.actors.map(actor => (
                    <Actor
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                : NoImage
                        }
                    />
                ))}
            </Grid>
        </>

    )
}

export default Movie;