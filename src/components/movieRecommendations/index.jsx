import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import MovieList from "../movieList";
import { getMovieRecommendations } from "../../api/tmdb-api";

const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // shows the first 6 recommendations
  const movies = data.results.slice(0, 6);

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Recommended Movies
      </Typography>
      <Grid container>
        {/* MovieCard calls action (movie), so we pass a function that returns
            nothing which are cards that only need the "More Info" link */}
        <MovieList movies={movies} action={() => null} />
      </Grid>
    </>
  );
};

export default MovieRecommendations;