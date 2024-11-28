import React, { useEffect, useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
import { Box, Stack, Typography, Button } from "@mui/material";
import MusicPlayer from "../common/MusicPlayer";
import Sidebar from "../common/Sidebar";
import MainTopbar from "../common/MainTopbar";


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
