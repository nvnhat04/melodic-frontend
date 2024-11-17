import React from 'react';
import { Grid2 } from '@mui/material';
import TrackItem from './TrackItem';

const TrackList = ({ songs, type }) => {
    return (
      <Grid2 container sx={{
        borderRadius: 5,
        width: '100%',
      }}>
        {songs.map((song, index) => (
          <TrackItem
            key={index}
            track={song}
            type = {type}
          />
        ))}
      </Grid2>
    );
  };

export default TrackList;