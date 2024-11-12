import React, { useEffect, useState } from "react";
import AlbumSlider from "../components/common/Slider";
import SideBar from "../components/common/Sidebar/Sidebar";
import { Box, Stack, Typography } from "@mui/material";
import Container from "../components/common/Container";
import MusicPlayer from "../components/common/MusicPlayer";

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

function HomePage() {
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [dailyTopHits, setDailyTopHits] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    setPopularAlbums(mockAlbums);
    setDailyTopHits(mockAlbums);
    setNewReleases(mockAlbums);
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#1f1f1f" }}>
      <Box
        sx={{
          width: "15%",
          backgroundColor: "#111", // Dark sidebar background
        }}
      >
        <SideBar />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1f1f1f",
        }}
      >
        <Box
          sx={{
            paddingTop: "1em",
            paddingBottom: "1em",
            height: "20%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #333",
            backgroundColor: "#000", // Dark top section background
          }}
        >
          <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
            Top Section
          </Typography>
        </Box>
        <Stack
          spacing={7}
          sx={{ width: "75vw", margin: "2rem auto", color: "#fff" }}
        >
          {popularAlbums.length > 0 && (
            <Container header="Popular Albums">
              <AlbumSlider list={popularAlbums} type={"Album"} />
            </Container>
          )}
          {dailyTopHits.length > 0 && (
            <Container header="Daily Top Hits">
              <AlbumSlider list={dailyTopHits} type={"Album"} />
            </Container>
          )}
          {newReleases.length > 0 && (
            <Container header="New Releases">
              <AlbumSlider list={newReleases} type={"Album"} />
            </Container>
          )}
          <Box sx={{ height: "13%", width: "100%" }}></Box>
        </Stack>

        <MusicPlayer />
      </Box>
    </Box>
  );
}

export default HomePage;
