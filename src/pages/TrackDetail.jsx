import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid2, Button, Avatar, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../components/Media/Header';
import LyricsCard from '../components/Media/LyricsCard';
import ArtistCard from '../components/Media/ArtistCard';
// const fetchSongData = async (songId) => {
//   // Replace with actual API endpoint
//   const response = await fetch(`https://api.example.com/songs/${songId}`);
//   const data = await response.json();
//   return data;
// };

const data1 = {
  id : 1,
  title: 'Song Title',
  artist: 'Artist Name',
  year: '2022',
  cover: 'https://' // URL to the cover image
}
const data2 = {
  id : 2,
  title: 'Song Title 2',
  artist: 'Artist Name 2',
  year: '2022',
  cover: 'https://i.pinimg.com/236x/e6/41/3b/e6413be3c20be4c7dc71cfcaf0652be3.jpg', // URL to the cover image
  genre: 'POP',
  album: 'Album Name',
}
const sampleLyrics = [
  'lalalalalalalalala',
  'lalalallallallalala',
  'i love you',
];
const artist = {
  name: 'BTS',
  avatar: 'https://i.pinimg.com/236x/fc/10/68/fc1068816ce57e34c5e66463b6a2f6ce.jpg',
  role: 'performer'
}
const TrackDetail = () => {
  const {id} = useParams();
  console.log(id);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const loadSongData = async () => {
      // const data = await fetchSongData(songId);
      setSongData(id === '1' ? data1 : data2);
    };
    loadSongData();
  }, [id]);

  if (!songData) return <Typography>Loading...</Typography>;

  return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        minHeight: '100vh',
        paddingLeft: 5,
        paddingTop: 5,
        bgcolor: 'black',
        color: 'text.primary',
    }}
>
    <Grid2 container spacing={5} sx={{ maxWidth: 1200, width: '100%' }}>
        <Grid2 item xs={12} sx={{width: '100%'}}>
            <Header
                media={songData}
                mediaType="track"
            />
        </Grid2>

        <Grid2 item xs={12} sx={{width: '100%'}}>
            <LyricsCard lyrics={sampleLyrics} />
            
        </Grid2>
        <Grid2 item xs={12} sx={{width: '100%'}}>
            <ArtistCard artist={artist} />
            
        </Grid2>


        
    </Grid2>
</Box>
  );
};

export default TrackDetail;
