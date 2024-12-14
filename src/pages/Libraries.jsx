import React, { useState, useEffect } from "react";
import Container from "../components/common/Container";
import CardGrid from "../components/common/CardGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LibraryAPI from "../api/modules/library.api";
import PlaylistAPI from "../api/modules/playlist.api";
import { useSelector, useDispatch } from "react-redux";
import { setListFavorites } from "../redux/store";

// Utility function to capitalize the first letter of a string
const capitalize = (str) => {
  if (!str) return '';  // Return empty string if the input is falsy
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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
          console.log(albumsResponse);
          fetchedData = albumsResponse;
          fetchedHeader = "Recent Albums";
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
    <Box ml={2} mr={2}>
      <Container header={header}>
        {!list || list.length === 0 ? (
          <Typography variant="h6" color="gray">
            No {capitalize(type)} found
          </Typography>
        ) : (
          <CardGrid List={list} Type={capitalize(type)} />
        )}
      </Container>
    </Box>
  );
};

export default Libraries;
