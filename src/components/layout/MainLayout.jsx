import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import MusicPlayer from "../common/MusicPlayer";
import Sidebar from "../common/Sidebar";
import MainTopbar from "../common/MainTopbar";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../redux/store";

const MainLayout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      {!token ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100vh" }}
        >
          <Typography variant="h3">Welcome to Melodic</Typography>
          <Button component={Link} to="/login" variant="contained">
            Login
          </Button>
        </Stack>
      ) : (
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
      <Box minHeight={'calc(100vh + 200px)'} bgcolor={'black'}>
      <Outlet />
      </Box>
      <Box>
        <MusicPlayer />
      </Box>
      </Stack>
      </Box>
      )}
    </>
  );
};

export default MainLayout;
