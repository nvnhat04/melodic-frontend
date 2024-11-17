import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import PlayScreen from "./pages/PlayScreen";
import ArtistManageMerchandise from "./pages/ArtistManageMerchandise";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Neue Helvetica Condensed BQ", "san-serif"].join(","),
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes className="App">
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/artist-profile" element={<ArtistProfile />}></Route>
          <Route path="/play-screen" element={<PlayScreen />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />{" "}
          <Route path="/artist" element={<ArtistDashboard />}>
            <Route
              path="merchandise"
              element={<ArtistManageMerchandise />}
            ></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
