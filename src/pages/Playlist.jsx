import React from "react";
import PlaylistHeader from "../components/Media/Header";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import TrackList from "../components/Media/TrackList";

const playlist = {
    title: "Playlist Title",
    artist: "Artist Name",
    genre: "Genre",
    year: "Year",
    description: "Description of the playlist goes here. This is a long description that will be displayed on the playlist page. It should provide some information about the playlist and the songs included in it. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "https://i.pinimg.com/474x/f8/82/7c/f8827ca528db119f68520bbd2141f080.jpg",
};

const songs = [
    {
        id: 1,
        title: "Song Title 1",
        artist: "Artist Name 1",
        duration: "150",
        track_order: 1,
    },
    {
        id: 2,
        title: "Song Title 2",
        artist: "Artist Name 2",
        duration: "160",
        track_order: 2,
    },
    {
        id: 3,
        title: "Song Title 3",
        artist: "Artist Name 3",
        duration: "90",
        track_order: 3,
    },
    {
        id: 4,
        title: "Song Title 4",
        artist: "Artist Name 4",
        duration: "180",
        track_order: 4,
    },
];

const Playlist = () => {
    const { id } = useParams();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                padding: 5,
                bgcolor: 'black',
                color: 'text.primary',
            }}
        >
            <Stack spacing={5} sx={{ maxWidth: 1200, width: '100%' }}>
                <PlaylistHeader media={playlist} mediaType="playlist" />
                <TrackList songs={songs} type="playlist" />
            </Stack>
        </Box>
    );
};

export default Playlist;
