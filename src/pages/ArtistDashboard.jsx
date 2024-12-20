import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import UserMenu from "../components/common/UserMenu";
import { Outlet } from "react-router-dom";
import ArtistDrawer from "../components/ArtistDashboard/ArtistDrawer";
import { useSelector } from "react-redux";
import accountApi from "../api/modules/account.api";

const drawerWidth = 240;

function ArtistDashboard(props) {
  const token = useSelector((state) => state.auth.token);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [user, setUser] = useState([]);
  const user_id = useSelector((state) => state.auth.user_id);
  useEffect(() => {
    accountApi
      .getUserById(user_id)
      .then((res) => {
        //  console.log("API Response:", res);
        if (res && res.length > 0) {
          setUser(res[0]);
          //  console.log("User data found:", res[0]);
        } else {
          console.error("No user data found");
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, [user_id]);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box p={2} sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          display: "block",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          opacity: "0.7",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {token ? (
            <Box
              sx={{
                position: "absolute",
                right: 20,
              }}
            >
              <UserMenu artist={true} />
            </Box>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              onClick={handleLogout}
              sx={{
                position: "absolute",
                right: 2,
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <ArtistDrawer
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          container={container}
          artist={user}
        />
      </Box>
      <Box
        component="main"
        mt="64px"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default ArtistDashboard;
