import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistProfile from './pages/ArtistProfile';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PlayScreen from './pages/PlayScreen';
import ShopPage from './pages/ShopPage';
import MerchandiseDetail from './pages/MerchandiseDetail';
import ManageRequest from './components/Admin/ManageRequest';
import ManageUsers from './components/Admin/ManageUsers';
import ManageTracks from './components/Admin/ManageTracks';
import ManagePlaylists from './components/Admin/ManagePlaylists';

function App() {
  return (
    <BrowserRouter>
      <Routes className="App">
          <Route path="/" element ={<HomePage/>}></Route>
          <Route path="/artist-profile" element ={<ArtistProfile/>}></Route>
          <Route path="/play-screen" element ={<PlayScreen/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/artist" element={<ArtistDashboard/>} >
          </Route>
          <Route path="/admin" element={<AdminDashboard />} >
            <Route path="users" element={<ManageUsers/>} />
            <Route index element={<ManageRequest/>} />
            <Route path="tracks" element={<ManageTracks/>} />
            <Route path="playlists" element={<ManagePlaylists/>} />
          </Route>
          <Route path="/shop" element={<ShopPage/>} />
          <Route path = "/merchandise/:id"  element={<MerchandiseDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
