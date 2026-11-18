import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import PopularPage from "./pages/popularPage";
import TopRatedPage from "./pages/topRatedPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import UpcomingPage from "./pages/upcomingPage";
import WatchlistPage from "./pages/watchlistPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// createTheme builds a set of colours that every MUI component reads from which makes to change the style as if you change it here, it restyles the whole app (buttons, cards, icons)
const theme = createTheme({
  palette: {
    mode: "dark", // MUI picks light text on dark backgrounds for us
    primary: { main: "#087BFA" }, // vibrant blue which is the same as the header
    secondary: { main: "#00B4FF" }, // lighter blue accent used by the Reviews button
    background: { default: "#000000", paper: "#0D1117" }, // page is black while the cards are almost black
  },
});

/*staleTime is how long in milliseconds cached data counts as fresh. While fresh, react-query returns it 
from the cache instead of calling the API again. This is the caching used by every endpoint in the app. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ThemeProvider gives every MUI component our blue/black colours.
          CssBaseline applies the theme's black background to the whole page. */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            {/* the order matters qs fixed paths like /movies/popular must come before
                /movies/:id, otherwise "popular" would be read as a movie id. */}
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/watchlist" element={<WatchlistPage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage />} />
              <Route path="/movies/popular" element={<PopularPage />} />
              <Route path="/movies/top-rated" element={<TopRatedPage />} />
              <Route path="/movies/now-playing" element={<NowPlayingPage />} />
              <Route path="/person/:id" element={<ActorDetailsPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);