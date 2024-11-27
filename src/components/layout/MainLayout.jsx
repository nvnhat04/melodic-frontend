import React, { useEffect, useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
import { Box, Stack, Typography } from "@mui/material";
import MusicPlayer from "../common/MusicPlayer";
import Sidebar from "../common/Sidebar";
import MainTopbar from "../common/MainTopbar";
import { Outlet } from "react-router-dom";

// Removed unused import: AlbumCard
// import AlbumCard from "../components/common/AlbumCard/AlbumCard";

const MainLayout = () => {
  
  return (
    <Box sx={{ display: "flex", backgroundColor: "black" }}>
    <Box
      sx={{
        width: {
          xs: 0,
          sm: 0,
          md: 240,
        },
        backgroundColor: "#111", // Dark sidebar background
      }}
    >
      <Sidebar />
    </Box>
    <Stack
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1f1f1f",
      }}
    >
      <Box pt={5}>
         <MainTopbar /> 
      </Box>
      <Box>
      <Outlet />
      </Box>
      <Box>
        <MusicPlayer />
      </Box>
      </Stack>

    </Box>
  );
}

export default MainLayout;
