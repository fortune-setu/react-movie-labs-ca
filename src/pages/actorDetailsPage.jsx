import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";

const ActorDetailsPage = () => {
  // useParams reads :id from the URL /person/:id
  const { id } = useParams();

  // two parameterised queries for the same actor, both cached by id
  const person = useQuery({
    queryKey: ["person", { id: id }],
    queryFn: getPerson,
  });

  const credits = useQuery({
    queryKey: ["personCredits", { id: id }],
    queryFn: getPersonMovieCredits,
  });

  if (person.isPending || credits.isPending) {
    return <Spinner />;
  }

  if (person.isError) {
    return <h1>{person.error.message}</h1>;
  }

  if (credits.isError) {
    return <h1>{credits.error.message}</h1>;
  }

  const actor = person.data;

  /* [...array] makes a copy first so sort() doesn't change the cached data.
  and then it sorts by popularity from highest to lowest keeping the top 12 movies. */
  const movies = [...credits.data.cast]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <Grid container spacing={3} sx={{ padding: "20px" }}>
      <Grid size={{ xs: 12, md: 3 }}>
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="h3" component="h1">
          {actor.name}
        </Typography>
        <Typography variant="h6" component="p">
          Born: {actor.birthday || "Unknown"}
          {actor.place_of_birth ? ` - ${actor.place_of_birth}` : ""}
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
          {actor.biography || "No biography available."}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="h5" component="h2">
          Known for
        </Typography>
      </Grid>
      {/* each card links to /movies/:id, so you can keep clicking from movie to actor to movie */}
      <Grid container size={12}>
        <MovieList movies={movies} action={() => null} />
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;