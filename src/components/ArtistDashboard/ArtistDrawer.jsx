import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import createUrl from "../../hooks/createUrl";

const drawerWidth = 240;

const ArtistDrawer = ({
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  container,
  artist,
}) => {
  const location = useLocation();

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
    {
      text: "Add New Album",
      ref: "/artist/add-album",
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
          src={createUrl(artist.avatar)}
          alt={artist.display_name}
          sx={{
            width: "70%",
            objectFit: "cover",
            aspectRatio: "1/1",
            borderRadius: "50%",
          }}
        />
        <Typography fontSize="1.3em">{artist.display_name}</Typography>
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
                <ListItemIcon sx={{ minWidth: "40px", color: "#f94c57" }}>
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
