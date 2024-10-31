import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CollaborationRequestCard from "../components/common/CollaborationRequestCard";
import TrackCard from "../components/common/TrackCard";

const image =
  "https://images.squarespace-cdn.com/content/v1/5911f44b9de4bb1465b0417a/1517949216805-IX2GVKMUU3KIUTZU6C8Z/image-asset.jpeg";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 300;

const mockTracksData = [
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "Blue Train",
    artist: "230 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "Lazy Bird",
    artist: "200 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "I'm Old Fashioned",
    artist: "150 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/My_Favorite_Things.jpg",
    name: "My Favorite Things",
    artist: "100 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/My_Favorite_Things.jpg",
    name: "Everytime We Say Goodbye",
    artist: "90 000 plays",
  },
];

const mockAlbumsData = [
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "Blue Train",
    artist: "900 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/My_Favorite_Things.jpg",
    name: "My Favorite Things",
    artist: "300 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/John_Coltrane_-_A_Love_Supreme.jpg/220px-John_Coltrane_-_A_Love_Supreme.jpg",
    name: "A Love Supreme",
    artist: "150 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Coltrane_Giant_Steps.jpg/220px-Coltrane_Giant_Steps.jpg",
    name: "Giant Steps",
    artist: "100 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/2a/Duke_Ellington_%26_John_Coltrane.jpg",
    name: "Duke Ellington & John Coltrane",
    artist: "90 000 plays",
  },
];

const mockCollaborationData = [
  {
    track: {
      cover:
        "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
      name: "Blue Train",
      artist: "John Coltrane",
    },
    artist: "Miles Davis",
    daysAgo: 3,
  },
  {
    track: {
      cover:
        "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
      name: "Blue Train",
      artist: "John Coltrane",
    },
    artist: "Miles Davis",
    daysAgo: 3,
  },
];

export default function ArtistDashboard() {
  const options = {
    merchandiseOptions: [
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
    trackOptions: [
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
    reportOptions: [
      {
        text: "Reports & Analytics",
        ref: "/artist/reports",
        icon: <AnalyticsIcon />,
      },
    ],
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
            justifyContent: "space-betw",
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
          {options.merchandiseOptions.map((option) => (
            <ListItem key={option.text} disablePadding>
              <Link
                sx={{ width: "100%" }}
                href={option.ref}
                underline="none"
                color="inherit"
              >
                <ListItemButton sx={{ dislay: "flex", width: "100%" }}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {options.trackOptions.map((option) => (
            <ListItem key={option.text} disablePadding>
              <Link
                sx={{ width: "100%" }}
                href={option.ref}
                underline="none"
                color="inherit"
              >
                <ListItemButton sx={{ dislay: "flex", width: "100%" }}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {options.reportOptions.map((option) => (
            <ListItem key={option.text} disablePadding>
              <Link
                sx={{ width: "100%" }}
                href={option.ref}
                underline="none"
                color="inherit"
              >
                <ListItemButton sx={{ dislay: "flex", width: "100%" }}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h3">Overview</Typography>
        <Box sx={{display: "flex"}}>
          <Card
            sx={{
              margin: "1em",
              border: "0.2em solid lightgray",
              borderRadius: "1em",
              minWidth: "20em",
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: "2em" }}>
                Monthly Listeners
              </Typography>
              <Typography sx={{ fontSize: "3em", fontWeight: "bold" }}>
                123 456 899
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <NorthEastIcon
                  sx={{ fontSize: "2em", fontWeight: "900", color: "green" }}
                />
                <Typography
                  sx={{ fontSize: "2em", fontWeight: "900", color: "green" }}
                >
                  10%
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              margin: "1em",
              border: "0.2em solid lightgray",
              borderRadius: "1em",
              minWidth: "20em",
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: "2em" }}>Revenue</Typography>
              <Typography sx={{ fontSize: "3em", fontWeight: "bold" }}>
                $10000
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <SouthEastIcon
                  sx={{ fontSize: "2em", fontWeight: "900", color: "red" }}
                />
                <Typography
                  sx={{ fontSize: "2em", fontWeight: "900", color: "red" }}
                >
                  12.5%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5">Top Songs</Typography>
            <List>
              {mockTracksData.map((track) => (
                <TrackCard track={track} />
              ))}
            </List>
          </Box>

          <Box sx={{ flexGrow: 1, marginLeft: "2em" }}>
            <Typography variant="h5">Top Albums</Typography>
            <List>
              {mockAlbumsData.map((track) => (
                <TrackCard track={track} />
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h4" wrap>
          Collaboration
        </Typography>
        <List>
          {mockCollaborationData.map((collaboration) => (
            <CollaborationRequestCard
              track={collaboration.track}
              artist={collaboration.artist}
              daysAgo={collaboration.daysAgo}
              onAccept={() => {}}
              onDecline={() => {}}
            />
          ))}
          </List>
      </Box>
    </Box>
  );
}
