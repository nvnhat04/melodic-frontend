import React, { useEffect, useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
import { Box, Stack, Typography, Button } from "@mui/material";
import MusicPlayer from "../common/MusicPlayer";
import Sidebar from "../common/Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../redux/store";
// Removed unused import: AlbumCard
// import AlbumCard from "../components/common/AlbumCard/AlbumCard";

const MainLayout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const handleLogout = () => {
    dispatch(clearToken());
  };
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
            backgroundColor: "#fff", // Dark top section background
          }}
        >
          <Typography variant="h6" align="center">
            Top Section
          </Typography>

          {!token && ( // If there is no token (user is not logged in)
            <>
              <Button>
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
          {token && ( // If there is a token (user is logged in)
            <>
              <Button onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </Button>
            </>
          )}
        </Box>
        <Box pl={3}>
          <Outlet />
        </Box>
        <MusicPlayer />
      </Stack>
    </Box>
  );
};

export default MainLayout;
