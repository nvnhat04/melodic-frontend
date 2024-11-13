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

function App() {
  return (
    <BrowserRouter>
      <Routes className="App">
          <Route path="/" element ={<HomePage/>}></Route>
          <Route path="/artist-profile" element ={<ArtistProfile/>}></Route>
          <Route path="/play-screen" element ={<PlayScreen/>}></Route>
          <Route path="/login" element={<Login />} />
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
