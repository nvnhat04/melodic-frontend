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
import { Stack } from "@mui/material";
import Slider from "../components/common/Slider";
import Container from "../components/common/Container";
function MultiSearch() {
  const artists = [
    {
      name: "Adele",
      cover:
        "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
      id: 1,
    },
    {
      name: "Ariana Grande",
      cover:
        "https://tse2.mm.bing.net/th?id=OIP.YmcUI6eaWlXuYJGAxqC-EQHaGL&pid=Api&P=0&h=180",
      id: 2,
    },
    {
      name: "Taylor Swift",
      cover:
        "https://i.pinimg.com/236x/ec/f3/58/ecf3580e3f5b4c1572acf9a918abf826.jpg",
      id: 3,
    },
    {
      name: "Billie Eilish",
      cover:
        "https://i.pinimg.com/236x/35/86/c8/3586c84c0523e960f32861cdc58d2da2.jpg",
      id: 4,
    },
    {
      name: "BTS",
      cover:
        "https://i.pinimg.com/236x/fc/10/68/fc1068816ce57e34c5e66463b6a2f6ce.jpg",
      id: 5,
    },
    {
      name: "Drake",
      cover:
        "https://i.pinimg.com/236x/42/8e/ae/428eae6b0abb3c60e10a75bc1ed759f3.jpg",
      id: 6,
    },
    {
      name: "Ed Sheeran",
      cover:
        "https://i.pinimg.com/474x/d3/a1/4c/d3a14c1a5cb9277b6c30b1439c95f244.jpg",
      id: 7,
    },
  ];

  const mockAlbums = [
    {
      id: 1,
      name: "Greatest Hits",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcqqlxSjVVcNbnAYS-mvZIypKavEO3edz6g&s",
    },
    {
      id: 2,
      name: "Summer Vibes",
      artist: "long",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdUlAVv8BhOstJLt47s3uceLIQQg-E2JDVg&s",
    },
    {
      id: 3,
      name: "Acoustic Sessions",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D6I_OM3e_cbZ5zhovzOMAm8BZxlsxxVsw&s",
    },
    {
      id: 4,
      name: "Live in Concert",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTf7Tn0Z1nA8ejs7ErQww1fWN_QGva57daeA&s",
    },
    {
      id: 5,
      name: "Classical Essentials",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8cxzBS2Ms5_7xSoZiHqSre5UJ43GfuQLdFw&s",
    },
    {
      id: 6,
      name: "Classical Essentials",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gjZolciMa0C4cL6096_Oapvt7W6GIrsrEA&s",
    },
    {
      id: 7,
      name: "Classical Essentials",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4l8txJSFCnQwOwJ5P-X8Obf9R0LJ8zBlkg&s",
    },
  ];
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [artistSearch, setArtistSearch] = useState([]);
  const [albumSearch, setAlbumSearch] = useState([]);

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
    setArtistSearch(artists);
    setAlbumSearch(mockAlbums);
  }, [searchQuery]);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        paddingBottom: "5vh",
      }}
    >
      <Stack
        spacing={7}
        sx={{ width: "75vw", margin: "2rem auto", color: "#fff" }}
      >
        {artistSearch.length > 0 && (
          <Container header="Artists" background="#1f1f1f">
            <Slider list={artistSearch} type={"Artist"} />
          </Container>
        )}
        {albumSearch.length > 0 && (
            <Container header="Albums" background="#1f1f1f">
                <Slider list={albumSearch} type={"Album"} />
            </Container>
        )

        }
      </Stack>
    </Box>
  );
}

export default MultiSearch;
