import React from "react";
import PlaylistHeader from "../components/Media/Header";
import TrackList from "../components/Media/TrackList";
import { Box, Stack, Typography } from "@mui/material";
import Footer from "../components/Media/Footer";
import Container from "../components/common/Container";
import {red} from "@mui/material/colors";
import { useState, useEffect } from "react";
import AlbumAPI from "../api/modules/album.api";
import { use } from "react";
import { useParams } from "react-router-dom";

const Album = () => {
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [merchandises, setMerchandises] = useState([]);
  const albumId = useParams().id;

  const redColor = red[900];

  useEffect(() => {
    AlbumAPI.getAlbumDetails(albumId)
      .then((response) => {
        const year = new Date(response.release_date).getFullYear();
        console.log(response);
        setAlbum({
            title: response.title,
            artist: response.artist,
            album: response.album,
            cover: response.cover,
            year: year,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    AlbumAPI.getAllTracksInAlbum(albumId)
      .then((response) => {
        setSongs(response);
      })
      .catch((error) => {
        console.error(error);
      });

    AlbumAPI.getRelatedMerchandises(albumId)
        .then((response) => {
            setMerchandises(response);
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
  }, [albumId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        bgcolor: "black",
        color: "text.primary",
        minHeight: "calc(100vh + 200px)",
      }}
    >
      <Stack spacing={5} sx={{ maxWidth: 1200, width: "100%" }}>
        <PlaylistHeader media={album} mediaType="album" />

        {songs && songs.length > 0 ? <TrackList songs={songs} type="album" /> : 
        <Box sx={{ width: "100%", textAlign: "left", fontSize: 20, fontWeight: "bold" }}>
          <Typography variant="h6" sx={{color: redColor}}>No tracks available</Typography>
        </Box>}

        <Container header="Related Merchandises">
          <Footer type="album" list={merchandises} />
        </Container>
      </Stack>
    </Box>
  );
};

export default Album;
