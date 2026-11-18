import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventIcon from "@mui/icons-material/Event";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Menu from "@mui/material/Menu";
import { useNavigate, useLocation } from "react-router";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  // 7 nav items need more room, so the hamburger menu is used below the "lg" size
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();
  // useLocation tells us the current URL path, used to highlight the active link
  const { pathname } = useLocation();

  const menuOptions = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Popular", path: "/movies/popular", icon: <WhatshotIcon /> },
    { label: "Top Rated", path: "/movies/top-rated", icon: <StarIcon /> },
    { label: "Now Playing", path: "/movies/now-playing", icon: <MovieIcon /> },
    { label: "Upcoming", path: "/movies/upcoming", icon: <EventIcon /> },
    { label: "Favorites", path: "/movies/favorites", icon: <FavoriteIcon /> },
    { label: "Watchlist", path: "/movies/watchlist", icon: <PlaylistAddCheckIcon /> },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#087BFA" }}>
        <Toolbar sx={{ position: "relative" }}>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  < MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)} sx={{ gap: 1 }}>
                    {opt.icon}
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "64px",
                    // textTransform: "none",
                    gap: 0.5,
                    borderBottom:
                      pathname === opt.path ? "3px solid white" : "3px solid transparent",
                    borderRadius: 0,
                  }}
                >
                  {opt.icon}
                  {opt.label}
                </Button>
              ))}
            </>
          )}
          <Typography variant="h4" sx={{
            position: "absolute", color: "#FFFFFF",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center"
          }}>
            Tee Screens
          </Typography>
        </Toolbar>
      </AppBar >
      <Offset />
    </>
  );
};

export default SiteHeader;
