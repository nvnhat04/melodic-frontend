import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PlayScreen from "./pages/PlayScreen";
import ArtistManageMerchandise from "./pages/ArtistManageMerchandise";
import ArtistAddNewMerchandise from "./pages/ArtistAddNewMerchandise";
import ArtistInbox from "./pages/ArtistInbox";
import Playlist from "./pages/Playlist";
import MainLayout from "./components/layout/MainLayout";
import ShopPage from "./pages/ShopPage";
import MerchandiseDetail from "./pages/MerchandiseDetail";
import ManageRequest from "./components/Admin/ManageRequest";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageTracks from "./components/Admin/ManageTracks";
import ManagePlaylists from "./components/Admin/ManagePlaylists";
import CartPage from "./pages/CartPage";
import MerchSearch from "./pages/MerchSearch";

import Album from "./pages/Album";
import Libraries from "./pages/Libraries";
import TrackDetail from "./pages/TrackDetail";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Neue Helvetica Condensed BQ", "Inter", "san-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes className="App">
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="artists" element={<Libraries type="artists" />} />
            <Route path="albums" element={<Libraries type="albums" />} />
            <Route path="playlists" element={<Libraries type="playlists" />} />
            <Route path="tracks" element={<Libraries type="tracks" />} />
            <Route path="track/:id" element={<TrackDetail />} />
            <Route path="playlist/:id" element={<Playlist />} />
            <Route path="artist/:id" element={<ArtistProfile />} />
            <Route path="album/:id" element={<Album />} />
          </Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/artist-profile" element={<ArtistProfile />}></Route>
          <Route path="/play-screen" element={<PlayScreen />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artist" element={<ArtistDashboard />} />
          <Route path="/test" element={<Playlist />}></Route>
          <Route path="/register" element={<Register />} />

          <Route path="/artist" element={<ArtistDashboard />}>
            <Route
              path="merchandise"
              element={<ArtistManageMerchandise />}
            ></Route>
            <Route
              path="upload-merchandise"
              element={<ArtistAddNewMerchandise />}
            ></Route>
            <Route path="inbox" element={<ArtistInbox />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="users" element={<ManageUsers />} />
            <Route index element={<ManageRequest />} />
            <Route path="tracks" element={<ManageTracks />} />
            <Route path="playlists" element={<ManagePlaylists />} />
          </Route>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/merchandise/:id" element={<MerchandiseDetail />} />
          <Route path="/shop/cart" element={<CartPage />} />
          <Route path="/merch-search" element={<MerchSearch />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
