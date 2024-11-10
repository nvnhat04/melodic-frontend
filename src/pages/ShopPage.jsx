import React, { useEffect, useState } from "react";
import MerchandiseSlider from "../components/common/Slider";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import Container from "../components/common/Container";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
// Sample product data
const mockProducts = [
  {
    id: 1,
    name: "BTS Official Light Stick",
    cover: "https://via.placeholder.com/300x300.png?text=BTS+Light+Stick",
  },
  {
    id: 2,
    name: "Album ABC",
    cover: "https://via.placeholder.com/300x300.png?text=Album+ABC",
  },
  {
    id: 3,
    name: "Album XYZ",
    cover: "https://via.placeholder.com/300x300.png?text=Album+XYZ",
  },
  {
    id: 4,
    name: "BTS Official Light Stick",
    cover: "https://via.placeholder.com/300x300.png?text=BTS+Light+Stick",
  },
  {
    id: 5,
    name: "Album ABC",
    cover: "https://via.placeholder.com/300x300.png?text=Album+ABC",
  },
  {
    id: 6,
    name: "Album XYZ",
    cover: "https://via.placeholder.com/300x300.png?text=Album+XYZ",
  },
  {
    id: 7,
    name: "BTS Official Light Stick",
    cover: "https://via.placeholder.com/300x300.png?text=BTS+Light+Stick",
  },
  {
    id: 8,
    name: "Album ABC",
    cover: "https://via.placeholder.com/300x300.png?text=Album+ABC",
  },
  {
    id: 9,
    name: "Album XYZ",
    cover: "https://via.placeholder.com/300x300.png?text=Album+XYZ",
  },
  // Add more products as needed
];

function ShopPage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [btsStore, setBtsStore] = useState([]);

  useEffect(() => {
    setNewArrivals(mockProducts);
    setTrendingNow(mockProducts);
    setBtsStore(mockProducts);
  }, []);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Trở lại trang trước đó
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1f1f1f",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#2c2c2c",
          color: "#fff",
          padding: "0.5em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "60%",
          }}
        >
          <IconButton sx={{ color: "#fff" }} onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>

          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{
              width: "50vw",
              backgroundColor: "#f0f0f0",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box width={"20%"}></Box>
        <Box
          sx={{ width: "20%", display: "flex", justifyContent: "space-evenly" }}
        >
          <IconButton sx={{ color: "#ff5b5b" }}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton sx={{ color: "#ff5b5b" }}>
            <MenuIcon />
          </IconButton>
          <IconButton sx={{ color: "#ff5b5b" }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content section */}
      <Stack
        spacing={7}
        sx={{ width: "90vw", margin: "2rem auto", color: "#fff" }}
      >
        {newArrivals.length > 0 && (
          <Container header="New Arrivals">
            <MerchandiseSlider list={newArrivals} type={"merchandise"}/>
          </Container>
        )}
        {trendingNow.length > 0 && (
          <Container header="Trending Now">
            <MerchandiseSlider list={trendingNow} type={"merchandise"}/>
          </Container>
        )}
        {btsStore.length > 0 && (
          <Container header="BTS'store">
            <MerchandiseSlider list={btsStore} type={"merchandise"}/>
          </Container>
        )}
      </Stack>
    </Box>
  );
}

export default ShopPage;
