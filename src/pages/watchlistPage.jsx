import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";

const WatchlistPage = () => {
  // The context only stores movie ids, e.g. [123, 456]
  const { playlist: movieIds } = useContext(MoviesContext);

  // useQueries runs one query per id, all at the same time which is the same as Favorites and the key ["movie", {id}] 
  // is the same one the movie details page uses, so a movie you already opened is taken from the cache instead of fetched again.
  const watchlistQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  // if any of the queries is still loading, the spinner shows
  const isPending = watchlistQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  // The details endpoint returns "genres" as objects but the filter card expects "genre_ids" (numbers), so build genre_ids is built from genres.
  const movies = watchlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies}
      action={(movie) => {
        return <RemoveFromWatchlist movie={movie} />;
      }}
    />
  );
};

export default WatchlistPage;