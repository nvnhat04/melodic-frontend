import React, { useEffect, useState } from "react";
import AlbumSlider from "../components/common/Slider";
import { Box, Stack, Typography } from "@mui/material";
import Container from "../components/common/Container";
import PlaylistCard from "../components/common/PlaylistCard";
import TrackSlider from "../components/HomePage/TrackSlider";

import playlistAPI from "../api/modules/playlist.api";
import MusicAPI from "../api/modules/music.api";
import FavoriteAPI from "../api/modules/favorite.api"
import { useSelector, useDispatch } from "react-redux";
import { setListFavorites } from "../redux/store";



function HomePage() {
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [dailyTopHits, setDailyTopHits] = useState("");
  const [melodicTopTracks, setMelodicTopTracks] = useState("");
  const [dailyTopFavorites, setDailyTopFavorites] = useState("");
  const [newReleases, setNewReleases] = useState([]);
  const [moods, setMoods] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteResponse = await FavoriteAPI.getListFavorites(token);
          dispatch(setListFavorites(favoriteResponse))

        const DailyTopHitsPlaylist = await playlistAPI.getPlaylistById(
          1,
          token
        );
        setDailyTopHits(DailyTopHitsPlaylist);

        const topTracks = await playlistAPI.getPlaylistById(2, token);
        setMelodicTopTracks(topTracks);

        const dailyTopFavorites = await playlistAPI.getPlaylistById(47, token);
        setDailyTopFavorites(dailyTopFavorites);

        const newReleases = await MusicAPI.getNewReleases();
        setNewReleases(newReleases);

        const popularAlbums = await MusicAPI.getTopAlbums();
        setPopularAlbums(popularAlbums);

        const topArtists = await MusicAPI.getTopArtists();
        setTopArtists(topArtists);

        const publicPlaylists = await MusicAPI.getPublicPlaylists();
        setMoods(publicPlaylists);

  
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);



  return (
    <Stack
      spacing={5}
      sx={{ width: "75vw", margin: "2rem auto", color: "#fff" }}
    >
      <Container header="Discover" sx={{
        height: "50vh"
      }}>
        <Box
          sx={{
            display: "flex", // Sử dụng flexbox để xếp theo hàng ngang
            gap: "10px",
            width: "100%", // Đảm bảo chiều rộng của Box là 100%
          }}
        >
          <Box
            sx={{
              flex: "1", // Chia đều không gian cho hai Card
              maxWidth: "33%", // Đảm bảo mỗi Card không vượt quá 50% chiều rộng
            }}
          >
            <PlaylistCard playlist={dailyTopHits} />
          </Box>
          <Box
            sx={{
              flex: "1",
              maxWidth: "33%",
            }}
          >
            <PlaylistCard playlist={melodicTopTracks} />
          </Box>
          <Box
            sx={{
              flex: "1",
              maxWidth: "33%",
            }}
          >
            <PlaylistCard playlist={dailyTopFavorites} />
          </Box>
        </Box>
      </Container>

      <Container header='New Releases'>
        <TrackSlider tracks={newReleases}/>
      </Container>

      {popularAlbums.length > 0 && (
        <Container header="Popular Albums">
          <AlbumSlider list={popularAlbums} type={"Album"} />
        </Container>
      )}

      {moods.length > 0 && (
        <Container header="Moods">
          <AlbumSlider list={moods} type={"Album"} />
        </Container>
      )}
     

     
      {/* {newReleases.length > 0 && (
        <Container header="Moods">
          <AlbumSlider list={newReleases} type={"Album"} />
        </Container>
      )} */}
      <Box sx={{ height: "17%", width: "100%" }}></Box>
    </Stack>
  );
}

export default HomePage;
