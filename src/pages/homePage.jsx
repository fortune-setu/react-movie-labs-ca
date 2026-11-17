import { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  // page is the page number currently shown starting at 1
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    // The page is part of the key, so every page is cached separately so going back to a page you already visited loads instantly from the cache.
    queryKey: ["discover", { page: page }],
    queryFn: getMovies,
    // keepPreviousData keeps the old movies on screen while the next page loads, so the page doesn't flash a spinner and the filters aren't reset.
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title="Discover Movies"
      movies={data.results}
      page={page}
      // TMDB only allows page numbers up to 500, so the page count is capped
      totalPages={Math.min(data.total_pages, 500)}
      onPageChange={setPage}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default HomePage;