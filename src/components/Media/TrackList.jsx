import React from 'react';
import Stack from '@mui/material/Stack';
import TrackItem from './TrackItem';

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
        />
      ))}
    </Stack>
  );
};

export default TrackList;
