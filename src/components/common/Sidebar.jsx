import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import HomeIcon from "@mui/icons-material/Home";
import NewIcon from "@mui/icons-material/NewReleases";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";


const Sidebar = ({open = false, toggleSidebar}) => {
  const [selectedItem, setSelectedItem] = useState("Home"); // State for active item
  const navigate = useNavigate();

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const handleItemClick = (text) => {
    setSelectedItem(text); // Update active item
  };


  const items = [
    { text: "Home", icon: <HomeIcon />, section: null },
    { text: "New", icon: <NewIcon />, section: null },
    { text: "Favorite", icon: <FavoriteIcon />, section: "Library" },
    { text: "Artists", icon: <PersonIcon />, section: "Library" },
    { text: "Albums", icon: <AlbumIcon />, section: "Library" },
    { text: "Tracks", icon: <MusicNoteIcon />, section: "Library" },
    { text: "Playlists", icon: <QueueMusicIcon />, section: "Playlists" },
    { text: "Shop", icon: <StorefrontIcon />, section: "Shop" },
  ];

  const drawerWidth = 240;
  const iconColor = "#fa586a";

  const Divider = ({ label }) => (
    <Typography
      sx={{
        padding: "10px 16px",
        color: "gray",
        fontWeight: "bold",
        textTransform: "lowercase",
        fontSize: "12px",
      }}
    >
      {label}
    </Typography>
  );

  const drawerContent = (
    <Box sx={{ padding: "10px", color: "white" }}>
      {/* Sidebar Header */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Melodic
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#333",
          borderRadius: "5px",
          padding: "5px 10px",
          marginBottom: "1rem",
        }}
      >
        <SearchIcon sx={{ color: "gray", marginRight: "8px" }} />
        <InputBase
          placeholder="Search"
          fullWidth
          sx={{
            color: "white",
            fontSize: "14px",
          }}
          onFocus={() => navigate("/genre")} // Redirect to AllGenre page on focus
        />
      </Box>

      {/* Sidebar Items */}
      <List>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index === 0 || items[index - 1].section !== item.section ? (
              item.section && <Divider label={item.section} />
            ) : null}
            <Link
              to={item.text === "Home" ? "/" : `/${item.text.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                onClick={() => handleItemClick(item.text)} // Set active item on click
                sx={{
                  borderRadius: "5px",
                  backgroundColor:
                    selectedItem === item.text ? "#444" : "transparent", // Active background color
                  "&:hover": {
                    backgroundColor: "#555", // Hover effect
                  },
                }}
              >
                <ListItemIcon sx={{ color: iconColor }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: "bold",
                      fontSize: "14px",
                      fontFamily: "Open Sans, sans-serif",
                      color: selectedItem === item.text ? "white" : "inherit", // Active text color
                    },
                  }}
                />
              </ListItem>
            </Link>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => toggleSidebar(false)}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1f1f1f",
            boxSizing: "border-box",
            borderRight: "0px",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, backgroundColor: "#1f1f1f" },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
