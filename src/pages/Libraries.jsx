import React, { useState, useEffect } from "react";
import Container from "../components/common/Container";
import CardGrid from "../components/common/CardGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LibraryAPI from "../api/modules/library.api";
import FavoriteAPI from "../api/modules/favorite.api";
import PlaylistAPI from "../api/modules/playlist.api";
import TrackAPI from "../api/modules/track.api";
import { useSelector, useDispatch } from "react-redux";
import { setListFavorites } from "../redux/store";

const Libraries = ({ type }) => {
  const [list, setList] = useState([]);
  const [header, setHeader] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData = [];
        let fetchedHeader = "";

        if (type === "artists") {
          const artistsResponse = await LibraryAPI.getRecentArtists(token);
          fetchedData = artistsResponse;
          fetchedHeader = "Recent Artists";
        } else if (type === "albums") {
          const albumsResponse = await LibraryAPI.getRecentAlbums(token);
          fetchedData = albumsResponse;
          fetchedHeader = "Recent Albums";
        } else if (type === "tracks") {
          const tracksResponse = await LibraryAPI.getRecentTracks(token);
          fetchedData = tracksResponse;
          fetchedHeader = "Recent Tracks";
        } else if (type === "favorite") {
          const favoriteResponse = await FavoriteAPI.getListFavorites(token);
          console.log("favorite", favoriteResponse);  

          // Extract track IDs
          console.log("favorite", favoriteResponse.length);
          const trackIds = favoriteResponse.map((item) => item.track_id);
          console.log("trackIds", trackIds);

          // Fetch track details for all favorite tracks
          const trackDetails = await Promise.all(
            trackIds.map(async (id) => {
              const response = await TrackAPI.getTrackById(id);
              return response;
            })
          );

          // Update Redux store and fetched data
          dispatch(setListFavorites(favoriteResponse));
          fetchedData = trackDetails;
          console.log("track",trackDetails);
          fetchedHeader = "Favorites";
        } else if (type === "playlists") {
          const playlistsResponse = await PlaylistAPI.getPlaylistByUser(token);
          fetchedData = playlistsResponse;
          fetchedHeader = "Recent Playlists";
        }

        // Update state
        setList(fetchedData);
        setHeader(fetchedHeader);
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      }
    };

    if (token && type) {
      fetchData();
    }
  }, [token, type, dispatch]);

  return (
    <Box m={5}>
      <Container header={header}>
        {!list || list.length === 0 ? (
          <Typography variant="h6" color="gray">
            No {type} found
          </Typography>
        ) : (
          <CardGrid List={list} Type={type} />
        )}
      </Container>
    </Box>
  );
};

export default Libraries;
