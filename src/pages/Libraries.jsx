import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/MediaCard";
import { Grid2, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Container from "../components/common/Container";

const Libraries = ({ type }) => {
  const artists = [
    {
      name: "Adele",
      cover:
        "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
      id: 1,
    },
    {
      name: "Ariana Grande",
      cover:
        "https://tse2.mm.bing.net/th?id=OIP.YmcUI6eaWlXuYJGAxqC-EQHaGL&pid=Api&P=0&h=180",
      id: 2,
    },
    {
      name: "Taylor Swift",
      cover:
        "https://i.pinimg.com/236x/ec/f3/58/ecf3580e3f5b4c1572acf9a918abf826.jpg",
      id: 3,
    },
    {
      name: "Billie Eilish",
      cover:
        "https://i.pinimg.com/236x/35/86/c8/3586c84c0523e960f32861cdc58d2da2.jpg",
      id: 4,
    },
    {
      name: "BTS",
      cover:
        "https://i.pinimg.com/236x/fc/10/68/fc1068816ce57e34c5e66463b6a2f6ce.jpg",
      id: 5,
    },
    {
      name: "Drake",
      cover:
        "https://i.pinimg.com/236x/42/8e/ae/428eae6b0abb3c60e10a75bc1ed759f3.jpg",
        id: 6,
    },
    {
      name: "Ed Sheeran",
      cover: "https://i.pinimg.com/474x/d3/a1/4c/d3a14c1a5cb9277b6c30b1439c95f244.jpg",
        id: 7,
    }
  ];
  const albums = [
    {
      name: "25",
      artist: "Adele",
      cover:
        "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
      id: 1,
    },
    {
      name: "Sweetener",
      artist: "Ariana Grande",
      cover:
        "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
      id: 2,
    },
  ];
  const playlists = [
    {
      name: "Chill",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/A",
      id: 1,
    },
    {
      name: "Workout",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/A",
      id: 2,
    },
  ];

  const tracks = [
    {
      name: "track1",
      cover: "",
      id: 1,
      artist: "artist1"
    },
    {
      name: "track2",
      cover: "",
      id: 2,
      artist: "artist2"
    }
  ]

  return (
    <>
      {type === "artists" && (
  <Box
    p={3}
    sx={{
      minHeight: "90vh",
      backgroundColor: "#1f1f1f",
    }}
  >
    <Container header="Artists">
      <Grid2 container spacing={3}>
        {artists.map((artist) => (
          <Grid2 item xs={12} sm={6} md={4} key={artist.id}>
              <Card media={artist} type="artist" />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  </Box>
)}

      {type === "albums" && (
        <Box>
          <Typography
            variant="h4"
            color="white"
            p={5}
            sx={{
              fontWeight: 600,
              textAlign: "left",
              fontFamily: '"Roboto", sans-serif',
              color: "white",
              textTransform: "uppercase",
              position: "relative",
              fontSize: "1.5rem",
              "&::after": {
                content: '""',
                display: "block",
                position: "relative",
                width: "4em",
                left: 0,
                right: 0,
                bottom: "1px",
                height: ".25em",
                background: "#e75565",
              },
            }}
          >
            Albums
          </Typography>

          <Grid2
            container
            spacing={3}
            paddingLeft={5}
            sx={{
              backgroundColor: "#1f1f1f",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {albums.map((album) => (
              <Grid2 item xs={12} sm={6} md={4} key={album.id}>
                <Card media={album} type="album" />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}

    {type === "playlists" && (
        <Box>
          <Typography
            variant="h4"
            color="white"
            p={5}
            sx={{
              fontWeight: 600,
              textAlign: "left",
              fontFamily: '"Roboto", sans-serif',
              color: "white",
              textTransform: "uppercase",
              position: "relative",
              fontSize: "1.5rem",
              "&::after": {
                content: '""',
                display: "block",
                position: "relative",
                width: "4em",
                left: 0,
                right: 0,
                bottom: "1px",
                height: ".25em",
                background: "#e75565",
              },
            }}
          >
            Playlists
          </Typography>

          <Grid2
            container
            spacing={3}
            paddingLeft={5}
            sx={{
              backgroundColor: "#1f1f1f",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {playlists.map((playlist) => (
              <Grid2 item xs={12} sm={6} md={4} key={playlist.id}>
                <Card media={playlist} type="playlist" />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}

    {type === "tracks" && (
        <Box>
          <Typography
            variant="h4"
            color="white"
            p={5}
            sx={{
              fontWeight: 600,
              textAlign: "left",
              fontFamily: '"Roboto", sans-serif',
              color: "white",
              textTransform: "uppercase",
              position: "relative",
              fontSize: "1.5rem",
              "&::after": {
                content: '""',
                display: "block",
                position: "relative",
                width: "4em",
                left: 0,
                right: 0,
                bottom: "1px",
                height: ".25em",
                background: "#e75565",
              },
            }}
          >
            Tracks
          </Typography>

          <Grid2
            container
            spacing={3}
            paddingLeft={5}
            sx={{
              backgroundColor: "#1f1f1f",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {tracks.map((track) => (
              <Grid2 item xs={12} sm={6} md={4} key={track.id}>
                <Card media={track} type="track" />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
    </>
  );
};

export default Libraries;
