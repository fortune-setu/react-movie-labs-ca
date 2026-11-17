import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("none");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  // .sort() changes the array it is called on, but filter() above already gave us a brand-new array, so the original (cached) data is safe.
  // sort((a, b) => ...) : a negative result puts a first, a positive puts b first.
  if (sortFilter === "rating") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average); // high -> low
  } else if (sortFilter === "newest") {
    // release_date is is like this "2025-12-31", so localeCompare sorts it correctly and "|| ''" stops a crash if a movie has no release date.
    displayedMovies.sort((a, b) =>
      (b.release_date || "").localeCompare(a.release_date || "")
    );
  } else if (sortFilter === "title") {
    displayedMovies.sort((a, b) => a.title.localeCompare(b.title)); // A -> Z
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else setSortFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortFilter={sortFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      {// Only show the page buttons when there is more than one page. (undefined > 1 is false, so Favorites/Watchlist show none.) 
      }
      {totalPages > 1 && (
        <Grid
          size={12}
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Pagination
            count={totalPages}
            page={page}
            // MUI gives (event, newPageNumber); we only need the number
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Grid>
      )}
    </Grid>
  );
}
export default MovieListPageTemplate;