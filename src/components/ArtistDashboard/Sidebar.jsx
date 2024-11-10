import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { NavItem, NavItemIcon, NavItemText } from "./NavItem";

export default function Sidebar() {
  const image =
    "https://images.squarespace-cdn.com/content/v1/5911f44b9de4bb1465b0417a/1517949216805-IX2GVKMUU3KIUTZU6C8Z/image-asset.jpeg";

  const options = {
    merchandiseNavItems: [
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
    ],
    trackNavItems: [
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
    ],
    reportNavItems: [
      {
        text: "Reports & Analytics",
        ref: "/artist/reports",
        icon: <AnalyticsIcon />,
      },
    ],
  };

  return (
    <Drawer
      sx={{
        width: "18em",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "18em",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <img
          src={`${image}`}
          width="70%"
          height="auto"
          style={{ borderRadius: "50%" }}
        />
        <Typography variant="h4">John Coltraine</Typography>
        <Typography variant="h5">Artist</Typography>
      </Box>
      <Divider />
      <List>
        {options.merchandiseNavItems.map((option) => (
          <NavItem key={option.text} selected={option.text === "Dashboard"}>
            <Link href={option.ref}>
              <ListItemButton>
                <NavItemIcon>{option.icon}</NavItemIcon>
                <NavItemText primary={option.text} />
              </ListItemButton>
            </Link>
          </NavItem>
        ))}
      </List>
      <Divider />
      <List>
        {options.trackNavItems.map((option) => (
          <NavItem key={option.text}>
            <Link href={option.ref}>
              <ListItemButton>
                <NavItemIcon>{option.icon}</NavItemIcon>
                <NavItemText primary={option.text} />
              </ListItemButton>
            </Link>
          </NavItem>
        ))}
      </List>
      <Divider />
      <List>
        {options.reportNavItems.map((option) => (
          <NavItem key={option.text}>
            <Link href={option.ref}>
              <ListItemButton>
                <NavItemIcon>{option.icon}</NavItemIcon>
                <NavItemText primary={option.text} />
              </ListItemButton>
            </Link>
          </NavItem>
        ))}
      </List>
    </Drawer>
  );
}
