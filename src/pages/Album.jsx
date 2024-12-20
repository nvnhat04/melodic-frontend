import React from "react";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";

import PlaylistHeader from "../components/Media/Header";
import TrackList from "../components/Media/TrackList";
import { Box, Stack, Typography } from "@mui/material";
import Footer from "../components/Media/Footer";
import Container from "../components/common/Container";
import {red} from "@mui/material/colors";
import AlbumAPI from "../api/modules/album.api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTrackToQueue, clearQueue } from "../redux/store";


const Album = () => {
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [merchandises, setMerchandises] = useState([]);
  const queue = useSelector((state) => state.queue);
  const albumId = useParams().id;
  const dispatch = useDispatch();

  const redColor = red[900];
  const fetchSongs = async () => {
    try {
        const response = await AlbumAPI.getTracksByAlbumId(albumId);
        console.log("ResponseSongs: ", response);
        setSongs(response);
    } catch (error) {
        console.error("Error fetching songs: ", error);
    }
};
 const fetchMerchandises = async () => {
    try {
        const response = await AlbumAPI.getRelatedMerchandises(albumId);
        console.log("ResponseMrach: ", response);
        setMerchandises(response);
    } catch (error) {
        console.error("Error fetching merchandises: ", error);
    }
}
const fetchAlbum = async () => {
    try {
        const response = await AlbumAPI.getAlbumByID(albumId);
        console.log("ResponseAlbum: ", response);
        setAlbum(response);
    } catch (error) {
        console.error("Error fetching album: ", error);
    }
}
const handleAddAllTracksToQueue = () => {
  dispatch(clearQueue());
  [...songs].reverse().forEach(song => dispatch(addTrackToQueue({ id: song.id })));
};
  useEffect(() => {
    // console.log("Album ID: ", albumId);
    // AlbumAPI.getAlbumDetails(albumId)
    //   .then((response) => {
    //     const year = new Date(response.release_date).getFullYear();
    //     // console.log(response);
    //     setAlbum({
    //         title: response.title,
    //         artist: response.artist,
    //         album: response.album,
    //         cover: response.cover,
    //         year: year,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    fetchAlbum();
    fetchSongs();
    fetchMerchandises();
    console.log("queue", queue);
  }, []);

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
        <PlaylistHeader media={album} mediaType="album" funct={handleAddAllTracksToQueue} />

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


