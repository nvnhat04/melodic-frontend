import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Stack } from '@mui/material';

const ArtistCard = ({ artist }) => {
  const textColor = 'gray';

  return (
    <Card
      style={{
        backgroundColor: 'black',
        color: '#ffffff',
        borderTop: '1px solid #333',
      }}
    >
      <CardContent sx={{ width: '100%' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }} // Stacks vertically on small screens, horizontally on medium+
          alignItems="center"
        >
          {/* Box for "Performing Artists" text */}
          <Box sx={{ width: { xs: '100%', md: '25%' } }}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color: textColor,
                position: "relative",
                left: "1vw",
              }}
            >
              Performing Artists
            </Typography>
          </Box>

          {/* Box for artist's details */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: { xs: '100%', md: '75%' } }}
          >
            <Avatar src={artist.avatar} alt={artist.name} sx={{ width: 45, height: 45 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{artist.name}</Typography>
              <Typography variant="body2" color="gray" sx={{ fontWeight: 'bold' }}>{artist.role}</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
