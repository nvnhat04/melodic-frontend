import React, { useEffect, useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
import { Box, Stack, Typography } from "@mui/material";
import MusicPlayer from "../common/MusicPlayer";
import Sidebar from "../common/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

// Removed unused import: AlbumCard
// import AlbumCard from "../components/common/AlbumCard/AlbumCard";

const MainLayout = () => {
  
  return (
    <Box sx={{ display: "flex", backgroundColor: "black" }}>
    <Box
      sx={{
        width: "15%",
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
      <Box
        sx={{
          paddingTop: "1em",
          paddingBottom: "1em",
          height: "10px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #333",
          backgroundColor: "#000", // Dark top section background
        }}
      >
          <Typography variant="h6" align="center">
            Top Section
          </Typography>
      </Box>
      <Box pl={3}>
      <Outlet />
      </Box>
      </Stack>

    </Box>
  );
}

export default MainLayout;
