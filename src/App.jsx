import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistProfile from './pages/ArtistProfile';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PlayScreen from './pages/PlayScreen';

import Playlist from './pages/Playlist';
import MainLayout from './components/layout/MainLayout';
import ShopPage from './pages/ShopPage';
import MerchandiseDetail from './pages/MerchandiseDetail';

import Album from './pages/Album';
import Libraries from './pages/Libraries';
import TrackDetail from './pages/TrackDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes className="App">
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="artists" element={<Libraries type="artists" />} />
          <Route path="albums" element={<Libraries type="albums" />} />
          <Route path="playlists" element={<Libraries type="playlists" />} />
          <Route path='tracks' element={<Libraries type="tracks" />} />
          <Route path='track/:id' element={<TrackDetail />} />
          <Route path='playlist/:id' element={<Playlist />} />
          <Route path='artist/:id' element={<ArtistProfile />} />
          <Route path='album/:id' element={<Album />} />
        </Route>
          <Route path="/home" element ={<HomePage/>}></Route>
          <Route path="/artist-profile" element ={<ArtistProfile/>}></Route>
          <Route path="/play-screen" element ={<PlayScreen/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Consistent component name */}
          <Route path="/artist" element={<ArtistDashboard />} />
          <Route path="/test" element={<Playlist />}></Route>
          <Route path="/register" element={<Register />} /> 
          <Route path="/artist" element={<ArtistDashboard />} /> 
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/shop" element={<ShopPage/>} />
          <Route path = "/merchandise/:id"  element={<MerchandiseDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
