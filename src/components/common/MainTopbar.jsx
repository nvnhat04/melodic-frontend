import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";


const Topbar = () => {


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <AppBar>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
             </Stack>
          </Toolbar>
        </AppBar>
    </>
    );
};

export default Topbar;