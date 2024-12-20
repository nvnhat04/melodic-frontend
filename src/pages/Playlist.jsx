import React, { useState, useEffect } from "react";
import PlaylistHeader from "../components/Media/Header";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import TrackList from "../components/Media/TrackList";
import PlaylistAPI from "../api/modules/playlist.api";
import TrackAPI from "../api/modules/track.api";
import { PlaylistProvider } from "../../src/hooks/PlaylistContext"; // Import the context provider
import usePlaylist from "../hooks/usePlaylist";
import { setPlaylistInfo } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackToQueue, clearQueue } from "../redux/store";
import { use } from "react";

const Playlist = () => {
//  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const playlist = useSelector((state) => state.playlist.playlistInfo);  // Lấy thông tin playlist từ Redux
  // console.log("playlist", playlist);
  const tracksInPlaylist = useSelector(
    (state) => state.playlist.tracksInPlaylist
  );
  const { id } = useParams();
  const { fetchTracksInPlaylist } = usePlaylist(token);
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.queue);
  const handleAddAllTracksToQueue = () => {
    dispatch(clearQueue());
    [...songs].reverse().forEach(song => dispatch(addTrackToQueue({ id: song.id })));
  };
  
  useEffect(() => {
      const fetchPlaylist = async () => {
        try {
          const res = await PlaylistAPI.getPlaylistById(id, token);
          const response = res[0];
          if (response && response.id) {
            const year = new Date(response.date_created).getFullYear();
            // Lưu thông tin playlist vào Redux
            dispatch(setPlaylistInfo({
              id: response.id,
              title: response.name,
              cover: response.cover,
              description: response.description,
              year: year,
              creatorId: response.creator_id,
            }));
          } else {
            console.error("Invalid playlist data:", response);
          }
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
      fetchPlaylist();
    fetchTracksInPlaylist(id)
  }, [id, token]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
       //await fetchTracksInPlaylist(); // Cập nhật tracksInPlaylist từ Redux
        // const tracks = await Promise.all(
        //   tracksInPlaylist.map(async (track, index) => {
        //     try {
        //       const trackDetails = await TrackAPI.getTrackById(track.id);
        //       console.log("trackDetails", trackDetails);
        //       return {
        //         ...trackDetails,
        //         orders: track.orders?? index + 1,
        //       };
        //     } catch (error) {
        //       console.error(`Failed to fetch track with ID: ${track.id}`, error);
        //       return null;
        //     }
        //   })
        // );

        setSongs(tracksInPlaylist);
      } catch (error) {
        console.error("Error fetching songs or tracks:", error);
      }
    };
    fetchSongs();
  }, [tracksInPlaylist]);
  useEffect(() => {
    console.log("queue", queue);
  }, [queue]);
  return (
    <PlaylistProvider creatorId={playlist.creatorId} playlistId={id}>
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
          <PlaylistHeader media={playlist} mediaType="playlist" funct={handleAddAllTracksToQueue} />
          <TrackList songs={songs} type="playlist" />
        </Stack>
      </Box>
    </PlaylistProvider>
  );
};

export default Playlist;
