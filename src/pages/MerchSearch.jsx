import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CardGrid from "../components/common/CardGrid";
import TopBar from "../components/common/Topbar";
function MerchSearch() {
  const mockMer = [
    {
      id: 1,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 2,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 3,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 4,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 4,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 5,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 6,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 7,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 8,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 9,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 10,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 11,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 12,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 13,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 14,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 15,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 16,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 17,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 18,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 19,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 20,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
    {
      id: 21,
      name: "Áo thun nam",
      price: 25,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/NBHD-SCULPTURE-TEE_600x.png?v=1681766714",
    },
    {
      id: 22,
      name: "Quần jeans nữ",
      price: 30,
      image:
        "https://shop.thenbhd.com/cdn/shop/files/NBHD-HOUSE-TEE_600x.png?v=1694035989",
    },
    {
      id: 23,
      name: "Giày thể thao",
      price: 50,
      image:
        "https://shop.thenbhd.com/cdn/shop/products/HOLLYWOODHOODIE_600x.png?v=1634018637",
    },
  ];
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch results based on search query
  useEffect(() => {
    // const fetchResults = async () => {
    //   if (searchQuery) {
    //     try {
    //       // Replace this with your API endpoint
    //       const response = await fetch(`/api/merch/search?q=${searchQuery}`);
    //       const data = await response.json();
    //       setSearchResults(data);
    //     } catch (error) {
    //       console.error("Error fetching search results:", error);
    //     }
    //   }
    // };

    // fetchResults();
    setSearchResults(mockMer);
  }, [searchQuery]);
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5",paddingBottom: "5vh", }}>
      <Box sx={{ paddingTop: "2em", marginLeft: "2vw" }}>
      <Typography sx={{fontWeight: "bold", fontSize: {
        xs: "4vw",
        sm: "3vw",
        md: "2vw"
      }}} gutterBottom>
        Search Results for: "{searchQuery}"
      </Typography>
      </Box>
      {searchResults.length > 0 ? (
        <Box
          sx={{
            width: "90%",
            margin: "2% 5%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
         <CardGrid List={searchResults}> </CardGrid>
        </Box>
      ) : (
        <Box sx={{fontWeight: "Bold", fontSize: "1.5vw", marginLeft: "2vw"}}> No result found</Box>
      )}
    </Box>
  );
}

export default MerchSearch;
