import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistProfile from './pages/ArtistProfile';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PlayScreen from './pages/PlayScreen';
import ArtistManageMerchandise from "./pages/ArtistManageMerchandise";
import ArtistAddNewMerchandise from "./pages/ArtistAddNewMerchandise";

import Playlist from './pages/Playlist';
import MainLayout from './components/layout/MainLayout';
import ShopPage from './pages/ShopPage';
import MerchandiseDetail from './pages/MerchandiseDetail';
import ManageRequest from './components/Admin/ManageRequest';
import ManageUsers from './components/Admin/ManageUsers';
import ManageTracks from './components/Admin/ManageTracks';
import ManagePlaylists from './components/Admin/ManagePlaylists';
import CartPage from './pages/CartPage';
import MerchSearch from './pages/MerchSearch';
import UploadTrack from './components/Artist/UploadTrack';
import Album from './pages/Album';
import Libraries from './pages/Libraries';
import TrackDetail from './pages/TrackDetail';
import AllGenre from './pages/AllGenre';
import UpdatePassword from "./pages/UpdatePassword";
// import Dashboard from './components/Artist/DashBoard';

import { createTheme, ThemeProvider } from "@mui/material";

import { useEffect } from 'react';
import { clearToken } from './redux/store';

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Neue Helvetica Condensed BQ", "Inter", "san-serif"].join(","),
  },
});

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  // console.log(role);
  // useEffect(() => {
  //   dispatch(clearToken());
  // });
  // console.log(token);
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes className="App">
        {/* <Route path="/" element={token ? <MainLayout /> : <Navigate to="/login"/> }> */}
        <Route path="/" element={ <MainLayout /> }>
          <Route index element={<HomePage />} />
          <Route path="artists" element={<Libraries type="artists" />} />
          <Route path="albums" element={<Libraries type="albums" />} />
          <Route path="playlists" element={<Libraries type="playlists" />} />
          <Route path="favorite" element={<Libraries type="favorite" />} />
          <Route path='tracks' element={<Libraries type="tracks" />} />
          <Route path='track/:id' element={<TrackDetail />} />
          <Route path='playlist/:id' element={<Playlist />} />
          <Route path='artist/:id/profile' element={<ArtistProfile />} />
          <Route path='album/:id' element={<Album />} />
          <Route path='genre' element={<AllGenre />} />
          <Route path='update-password' element={<UpdatePassword />} />
        </Route>
        <Route path="/artist" element={<ArtistDashboard />} >
             {/* <Route index element={<Dashboard/>} />  */}
            {/* <Route path="dashboard" element={<Dashboard/>} /> */}
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Consistent component name */}
          <Route path="/register" element={<Register />} /> 
          
           <Route path="/artist" element={<ArtistDashboard />}>

        <Route path="/artist" element={<ArtistDashboard />} >
            {/* <Route index element={<Dashboard/>} /> */}
            {/* <Route path="dashboard" element={<Dashboard/>} /> */}
            <Route path="upload-track" element={<UploadTrack/>} />
            </Route>
              <Route
                path="merchandise"
                element={<ArtistManageMerchandise />}
              ></Route>
              <Route
              path="upload-merchandise"
              element={<ArtistAddNewMerchandise/>}
              ></Route>
        </Route>
          <Route path="/play-screen" element ={<PlayScreen/>}></Route>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} /> {/* Consistent component name */}
          <Route path="/test" element={<Playlist />}></Route>
          <Route path="/register" element={<Register />} /> 
          
          <Route path="/admin" element={role === 'admin'? <AdminDashboard /> : <Navigate to='/'/>} >
            <Route path="users" element={<ManageUsers/>} />
            <Route index element={<ManageRequest/>} />
            <Route path="tracks" element={<ManageTracks/>} />
            <Route path="playlists" element={<ManagePlaylists/>} />
          </Route>
          <Route path="/shop" element={<ShopPage/>} />
          <Route path = "/merchandise/:id"  element={<MerchandiseDetail/>} />
          <Route path = "/shop/cart" element={<CartPage/>} />
          <Route path="/merch-search" element={<MerchSearch />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
