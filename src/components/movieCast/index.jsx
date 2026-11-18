import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import { getMovieCredits } from "../../api/tmdb-api";

const MovieCast = ({ movie }) => {
  /* it's a parametised endpoint where the movie's id goes into the query key and
   react-query hands it to getMovieCredits while each movie's cast is cached by id. */
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // only shows a list of the first 12 actors which is ordered by billing
  const cast = data.cast.slice(0, 12);

  return (
    <>
      <Typography variant="h5" component="h3">
        Cast
      </Typography>
      <Paper
        component="ul"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 1.5,
          margin: 0,
        }}
      >
        {cast.map((actor) => (
          <li key={actor.credit_id}>
            {/* component={Link} makes the Chip render as a router link, so
                clicking it goes to /person/:id without reloading the page */}
            <Chip
              component={Link}
              to={`/person/${actor.id}`}
              clickable
              avatar={
                <Avatar
                  alt={actor.name}
                  // profile_path can be null, so only build the URL if it exists
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : undefined
                  }
                />
              }
              label={`${actor.name} as ${actor.character}`}
              sx={{ margin: 0.5 }}
            />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default MovieCast;