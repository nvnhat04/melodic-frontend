import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid2,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../components/Media/Header";
import LyricsCard from "../components/Media/LyricsCard";
import ArtistCard from "../components/Media/ArtistCard";
import TrackAPI from "../api/modules/track.api";

const TrackDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const loadSongData = async () => {
      const response = await TrackAPI.getTrackById(id);
      if (response.release_date) {
        const year = response.release_date.split("-")[0];
        response.year = year;
      }

      setSongData({
        id: response.id,
        title: response.title,
        artists: response.artists || [],
        cover: response.cover,
        lyrics: response.lyrics || null,
        artistId: response.artistId,
        albumId: response.album.id,
        year: response.year,
      });
      console.log(response);
    };
    loadSongData();
  }, [id]);

  if (!songData) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        minHeight: "100vh",
        paddingLeft: 5,
        paddingTop: 5,
        bgcolor: "black",
        color: "text.primary",
      }}
    >
      <Grid2 container spacing={5} sx={{ maxWidth: 1200, width: "100%" }}>
        <Grid2 item xs={12} sx={{ width: "100%" }}>
          {songData && <Header media={songData} mediaType="track" />}
        </Grid2>

        <Grid2 item xs={12} sx={{ width: "100%" }}>
          {songData.lyrics ? (
            <LyricsCard lyrics={songData.lyrics} />
          ) : (
            <Typography variant="h6" color="gray">
              No lyrics available
            </Typography>
          )}
        </Grid2>

        <Grid2 item xs={12} sx={{ width: "100%" }}>
          {songData.artists.length > 0 ? (
            <ArtistCard  artists={songData.artists} />
          ) : (
            <Typography variant="h6" color="gray">
              No artists available
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default TrackDetail;
