import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#FFD700" }, // dourado
    secondary: { main: "#000000" }, // preto
    background: { default: "#000000", paper: "#111111" },
    text: { primary: "#FFD700", secondary: "#FFFFFF" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    allVariants: { color: "#FFD700" },
  },
});

export default theme;
