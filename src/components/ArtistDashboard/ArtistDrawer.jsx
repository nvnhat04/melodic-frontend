import React from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { ListItem, Typography } from "@mui/material";

const drawerWidth = 240;

const ArtistDrawer = ({
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  container,
}) => {
  const location = useLocation();

  const artist = {
    name: "The Neighbourhood",
    img: "https://media.pitchfork.com/photos/5a9f0c13b848c0268b2016bb/1:1/w_800,h_800,c_limit/The%20Neighbourhood.jpg",
  };

  const navItems = [
    {
      text: "Dashboard",
      ref: "/artist",
      icon: <HomeIcon />,
    },
    {
      text: "Inbox",
      ref: "/artist/inbox",
      icon: <InboxIcon />,
    },
    {
      text: "Manage Merchandise",
      ref: "/artist/merchandise",
      icon: <InventoryIcon />,
    },
    {
      text: "Add New Merchandise",
      ref: "/artist/upload-merchandise",
      icon: <AddBoxIcon />,
    },
    {
      text: "Orders",
      ref: "/artist/orders",
      icon: <ShoppingBagIcon />,
    },
    {
      text: "Manage Tracks",
      ref: "/artist/tracks",
      icon: <LibraryMusicIcon />,
    },
    {
      text: "Add New Track",
      ref: "/artist/upload-track",
      icon: <AddBoxIcon />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Box
        mb={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        gap={1}
      >
        <Box
          component="img"
          src={artist.img}
          alt={artist.name}
          sx={{
            width: "70%",
            objectFit: "cover",
            aspectRatio: "1/1",
            borderRadius: "50%",
          }}
        />
        <Typography fontSize="1.3em">{artist.name}</Typography>
        <Typography>Artist</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((option) => (
          <ListItem
            key={option.text}
            selected={location.pathname === option.ref}
            sx={{ padding: "0" }}
          >
            <Link
              to={option.ref}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default ArtistDrawer;
