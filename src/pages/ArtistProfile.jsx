import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Stack, Typography, useTheme } from "@mui/material";
import AlbumSlider from "../components/common/Slider";
import Container from "../components/common/Container";
import { MdPlayCircle } from "react-icons/md";
import Box from "@mui/material/Box";
import artistApi from "../api/modules/artist.api";
import accountApi from "../api/modules/account.api";

import TopSongs from "../components/Artist/TopSongs";
import uiConfigs from "../configs/ui.configs";
import createUrl from "../hooks/createUrl";
import musicApi from "../api/modules/music.api";
const artistData = [
  {
    id: null,
    display_name: "",
    avatar:"",
  },
];
const topSongs01 = [
  {
    "id": "MjU4Yzc1ZmUtYjE1Ni00YzgyLWFhYjktNWJjMTE2ZGVhMmRh",
    "title": "Stargazing",
    "release_date": "2024-12-04T17:00:00.000Z",
    "track_url": "1WxzMpFCb1MoCSqfkI2d9IHNClq5e9upt",
    "cover": null,
    "genres": [],
    "artists": []
  },

];
const listAlbumsMock = [
  {
    id: 1,
    name: "",
    artist: "l",
    cover:"",
    release_date: "",
  },
];

function ArtistProfile() {
    const theme = useTheme();
    const artist_id = useParams().id;
    const [artist, setArtist] = useState(artistData[0]);
    const [listAlbums, setListAlbums] = useState(listAlbumsMock);
    const [topSongs, setTopSongs] = useState(topSongs01);
    const [topArtists, setTopArtists] = useState([]);
    const [latestSong, setLatestSong] = useState({
        id: null,
        title: "",
        artists: [],
        track_cover: "",
        release_date: "", // Placeholder
    });
    const [latestUrl, setLatestUrl] = useState(null);
    const fetchAlbums = async () => {
        try {
            const response = await artistApi.getAllAlbums(artist_id);
            // console.log("list album: ",response);
            if (response) {
                setListAlbums(response);
            }
        } catch(err) {
            console.error(err);
        }
    };
    const fetchTopSongs = async () => {

        try {
            const response = await artistApi.getTopTracks(artist_id);
            // console.log(response);
            if (response) {
                setTopSongs(response);
            }
        } catch(err) {
            console.error(err);
        }
    };
    const fetchLatestSong = async () => {
        try {
            const response = await artistApi.getLatestTracks(artist_id);
            console.log("latest song: ",response);
            if (response) {
                setLatestSong(response);
            }
        } catch(err) {
            console.error(err);
        }
    };
    const fetchArtist = async () => {
        try {
            const response = await accountApi.getUserById(artist_id);
            if (response) {
                setArtist(response[0]);
            }
        } catch(err) {
            console.error(err);
        }
    };
    const fetchTopArtists = async () => {

        try {
            const response = await musicApi.getTopArtists();
            if (response) {

                setTopArtists(response);
            }
        } catch(err) {

            console.error(err);
        }
      }
    useEffect(() => {
        fetchTopArtists();
        fetchAlbums();
        fetchTopSongs();
        // fetchLatestSong();
        fetchArtist();
        // console.log(artist);
        // console.log(listAlbums);
        // console.log(topSongs)
    }, [artist_id]);
    // useEffect(() => {
    //   // fetchArtist();
    //   console.log('artist: ',artist);
    // }, [artist]);

    useEffect(() => {
      fetchLatestSong();
      console.log('latest song: ',latestSong);
      if(latestSong) {
        setLatestUrl(createUrl(latestSong.cover));
      } else {
        console.log("latest song is null");
      }
      // console.log('latest url: ',latestUrl);
    }, []);

  return (
    <Box
      sx={{
        color: "white",
        marginLeft: "30px",
        padding: "10px",
        width: "calc(100% - 30px)",
      }}
    >
      {/* backdrops */}
      <Box sx={{ position: "relative" }}>
        {/* <ImageHeader imgPath={artist.imgPath} /> */}
        {/* <img src = {artist.imgPath} alt = "" style = {{width: "100%", height: "50%"}}/> */}
        <Box
            style={{
                height: "40vh",
                backgroundImage: `url(${artist.backdrop ? artist.backdrop : null})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    ...uiConfigs.style.gradientBgImage[theme.palette.mode]
                }
            }}
            />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "30%",
            display: "flex",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              padding: "10px",
              width: "100%",
              bottom: "0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <MdPlayCircle size={"40px"} color="#d60017" />
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {artist.display_name}
              </Typography>
            </Box>
            {/* <Typography variant="h8" sx={{ paddingLeft: "10px" }}>
              10000 Monthly listeners
            </Typography> */}
          </Box>
        </Box>
      </Box>

      {/* Lastest release and top hit */}
      <Box
        sx={{
          display: "flex",
          height: "30%",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        {/* Lastest release */}
        <Box
          sx={{
            width: "40%",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", padding: "10px" }}>
            Lastest release
          </Typography>
          <Box sx={{ display: "flex", gap: "10px", padding: "10px" }}>
            <Box
              sx={{
                width: "40%",
                height: "40%",
                backgroundColor: "gray",
              }}
            >
              <img
                src={latestUrl}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box>
              <Link to={`/track/${latestSong.id}`} style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {latestSong.title}
              </Typography>
              <Typography variant="h8">{latestSong.release_date.substring(0,4)}</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
        

        {/* Top hit */}
        <Box sx={{
            width: "60%",
            padding: "15px",
        }}>
             <TopSongs topSongs={topSongs} />
        </Box>
       
        </Box>
      {/* Album */}
      <Box>
        {listAlbums.length > 0 && (
          <Container header="Popular Albums">
            <AlbumSlider list={listAlbums} type={"Album"} />
          </Container>
        )}
      </Box>
      {/*Artist collab*/}
      {topArtists.length > 0 && (
        <Container header="Reference Artists">
          <AlbumSlider list={topArtists} type={"Artist"} />
        </Container>
      )}
      {/* Single & EP*/}
      <Box>
        {listAlbums.length > 0 && (
          <Container header="Single & EP">
            <AlbumSlider list={listAlbums} type={"Album"} />
          </Container>
        )}
      </Box>
      {/* Description */}
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Description
        </Typography>
        <Typography variant="h8">{artist.bio}</Typography>
      </Box>
      <Box sx={{ padding: "10px", height: "15vh" }}></Box>
    </Box>

  );
}
export default ArtistProfile;
