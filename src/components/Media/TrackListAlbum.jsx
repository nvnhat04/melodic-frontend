import React from 'react';
import Stack from '@mui/material/Stack';
import TrackItem from './TrackItemAlbum';

const TrackList = ({ songs, type }) => {
  return (
    <Stack
      sx={{
        borderRadius: 5,
        width: '100%',
      }}
    >
      {songs.map((song, index) => (
        <TrackItem
          key={index}
          track={song}
          type={type}
          order={index + 1}
        />
      ))}
    </Stack>
  );
};

export default TrackList;
