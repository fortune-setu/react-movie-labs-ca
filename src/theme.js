import { createTheme } from "@mui/material/styles";

// createTheme builds a set of colours that every MUI component reads from which makes to change the style as if you change it here, it restyles the whole app (buttons, cards, icons)
const theme = createTheme({
  palette: {
    mode: "dark", // MUI picks light text on dark backgrounds for us
    primary: { main: "#087BFA" }, // vibrant blue which is the same as the header
    secondary: { main: "#00B4FF" }, // lighter blue accent used by the Reviews button
    background: { default: "#000000", paper: "#0D1117" }, // page is black while the cards are almost black
  },
});

export default theme;