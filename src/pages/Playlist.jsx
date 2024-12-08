import React from "react";
import { useState, useEffect } from "react";
import PlaylistHeader from "../components/Media/Header";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import TrackList from "../components/Media/TrackList";
import PlaylistAPI from "../api/modules/playlist.api";
import { useSelector } from "react-redux";
import TrackAPI from "../api/modules/track.api";

const Playlist = () => {
  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await PlaylistAPI.getPlaylistById(id, token);

      // Nếu response trả về trực tiếp object playlist
      console.log(response);

      if (response && response.id) {
        const year = new Date(response.date_created).getFullYear();
        setPlaylist({
          id: response.id,
          title: response.name,
          cover: response.cover,
          description: response.description,
          year: year,
        //   dateModified: response.date_modified,
        //   creatorId: response.creator_id,
        //   isPublic: response.is_public,
        });

      } else {
        console.error("Invalid response format", response);
      }
    };

    const fetchSongs = async () => {
        try {
          const response = await PlaylistAPI.getTracksInPlaylist(id, token);
      
          if (!response || response.length === 0) {
            console.error("Invalid response format or no tracks found", response);
            return;
          }
      
          const trackIds = response.map((item) => item.track_id);
          console.log("trackIds", trackIds);
      
          // Fetch all track details in parallel
          const tracks = await Promise.all(
            trackIds.map(async (trackId, index) => {
              try {
                const track = await TrackAPI.getTrackById(trackId);
      
                // Add track_order as index + 1
                return { ...track, track_order: index + 1 };
              } catch (error) {
                console.error(`Failed to fetch track with ID: ${trackId}`, error);
                return null; // Return null for failed requests
              }
            })
          );
      
          // Filter out null values and update the state
          setSongs(tracks.filter((track) => track !== null));
          console.log("tracks", tracks);
        } catch (error) {
          console.error("Error fetching songs or tracks", error);
        }
      };
      
    fetchPlaylist();
    fetchSongs();
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 5,
        bgcolor: "black",
        color: "text.primary",
      }}
    >
      <Stack spacing={5} sx={{ maxWidth: 1200, width: "100%" }}>
        <PlaylistHeader media={playlist} mediaType="playlist" />
        <TrackList songs={songs} type="playlist" />
      </Stack>
    </Box>
  );
};

export default Playlist;
