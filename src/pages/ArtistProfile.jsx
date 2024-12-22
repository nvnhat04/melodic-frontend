import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  {
    "id": "ZmNkNDk1NTAtZGM0Yy00ZWM3LTg1NWEtNDE5MDIwMTM1ZTE0",
    "title": "Stargazing",
    "release_date": "2024-12-04T17:00:00.000Z",
    "track_url": "1JrtBa0b9zRmsPRIodaJiIrozYj3piQd9",
    "cover": null,
    "genres": [],
    "artists": []
  },
  {
    "id": "YzgxYTNhMzQtNDBmNy00NTBkLTk2NzYtNjVmODM3ZmNkNjAz",
    "title": "Summer cruel",
    "release_date": "2024-11-30T17:00:00.000Z",
    "track_url": "1SOKem-klZOV5-aTNxnFjF2t5X0-yEXc5",
    "cover": null,
    "genres": [],
    "artists": []
  },
  {
    "id": "YjdkZTAyZWItZDBjMy00YjYwLTk0YjctMTRkZTExMDhlZWJk",
    "title": "Summer cruel",
    "release_date": "2024-11-30T17:00:00.000Z",
    "track_url": "1KvJ5otauKw9lR55Jh5wqul8U4f5dfr9p",
    "cover": "1uPpcuN038RVhwU-IHLHSsCxG61lpCHay",
    "genres": [
      "ballad",
      "pop"
    ],
    "artists": [
      {
        "id": "34",
        "display_name": "Sơn Tùng M-TP",
        "username": "sontungmtp"
      },
      {
        "id": "34",
        "display_name": "Sơn Tùng M-TP",
        "username": "sontungmtp"
      },
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      },
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      }
    ]
  },
  {
    "id": "MzU5NTUwMTYtY2Q2Mi00MDcyLThhMGYtNzRmNzMwMzJiMjIx",
    "title": "The first song",
    "release_date": "2024-11-28T17:00:00.000Z",
    "track_url": "1WnfzLsUevKTbHP-DGdf7eq1lOOXxRdjV",
    "cover": null,
    "genres": [],
    "artists": []
  },
  {
    "id": "ZmYwMTQ1YmYtMjU4Ni00ZThmLWFjMzMtZGUyNTc2NzEwY2Q1",
    "title": "The 2thTrack",
    "release_date": "2024-11-28T17:00:00.000Z",
    "track_url": "1Ap3WyfAiLN22wUZSHlNBtTd-QmWwGoqq",
    "cover": "1uPpcuN038RVhwU-IHLHSsCxG61lpCHay",
    "genres": [
      "ballad",
      "hip hop",
      "pop"
    ],
    "artists": [
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      },
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      },
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      }
    ]
  },
  {
    "id": "MzU5YWVlNzUtODk1ZS00MzVhLThhMmQtZTAyZTBlNTM4OTU2",
    "title": "The first song",
    "release_date": "2024-11-28T17:00:00.000Z",
    "track_url": "1S_a_tfkRSJQ8D16YQDqO4wN4yhP0C1rZ",
    "cover": "1uPpcuN038RVhwU-IHLHSsCxG61lpCHay",
    "genres": [
      "ballad",
      "pop"
    ],
    "artists": [
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      },
      {
        "id": "8",
        "display_name": "nhat nguyen",
        "username": "nhat123"
      },
      {
        "id": "34",
        "display_name": "Sơn Tùng M-TP",
        "username": "sontungmtp"
      },
      {
        "id": "34",
        "display_name": "Sơn Tùng M-TP",
        "username": "sontungmtp"
      }
    ]
  },
  {
    "id": "M2Q1YWJjNTctYmVmZC00MGJiLTk1NGMtNWQ5YjBkNTZiMDM3",
    "title": "Hãy trao cho anh",
    "release_date": "2024-11-26T17:00:00.000Z",
    "track_url": "1wCbyOR0E__okyNu0N2EgadixMG876mr1",
    "cover": "1uPpcuN038RVhwU-IHLHSsCxG61lpCHay",
    "genres": [
      "r&b"
    ],
    "artists": [
      {
        "id": "34",
        "display_name": "Sơn Tùng M-TP",
        "username": "sontungmtp"
      }
    ]
  }
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
            console.log(response);
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
    useEffect(() => {
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
      // console.log('latest song: ',latestSong);
      if(latestSong) {
        setLatestUrl(createUrl(latestSong.cover));
      } else {
        console.log("latest song is null");
      }
      // console.log('latest url: ',latestUrl);
    }, [latestSong]);

  return (
    <Box
      sx={{
        color: "white",
        marginLeft: "30px",
        padding: "10px",
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
            <Typography variant="h8" sx={{ paddingLeft: "10px" }}>
              79,123,456 Monthly listeners
            </Typography>
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
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {latestSong.title}
              </Typography>
              <Typography variant="h8">{latestSong.release_date.substring(0,4)}</Typography>
            
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
      <Box>
        {listAlbums.length > 0 && (
          <Container header="Artist reference">
            <AlbumSlider list={listAlbums} type={"Album"} />
          </Container>
        )}
      </Box>
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
