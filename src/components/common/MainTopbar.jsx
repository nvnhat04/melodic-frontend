import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import {useSelector, useDispatch} from "react-redux";
import {clearToken} from "../../redux/store";

const Topbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <AppBar sx={{
          backgroundColor: "#111",
        }}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              {token ? (
                <Box sx={{
                  position: "absolute",
                  right: 20,
                }}>
                  <UserMenu />
                </Box>
              ) : (
                <Button component={Link} to="/login" color="inherit" onClick={handleLogout} sx={{
                  position: "absolute",
                  right: 2}}>
                  Login
                </Button>
              )}
             </Stack>
          </Toolbar>
        </AppBar>
    </>
    );
};

export default Topbar;