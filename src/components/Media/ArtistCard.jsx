import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Stack } from '@mui/material';

const ArtistCard = ({ artists }) => {
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
          direction="column"
          alignItems="flex-start"
          spacing={0}
        >
          {/* Title for Performing Artists */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color: textColor,
                position: 'relative',
                left: '1vw',
                top: { 
                  md: '2.5vh',
                }
              }}
            >
              Performing Artists
            </Typography>
          </Box>

          {/* Container for Artist Details */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2, // Adds space between the items
              width: '75%', // Ensure the width is the same as the "Lyrics" section
              paddingLeft: {
                md: '25%', // Align with lyrics' starting position
                xs: '0', // Align with lyrics' starting position
              }, // Align with lyrics' starting position
            }}
          >
            {artists.map((artist, index) => (
              <Box
                key={index}
                sx={{
                  flexBasis: { xs: '100%', sm: '48%', md: '32%', lg: '23%' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar src={artist.avatar} alt={artist.name} sx={{ width: 45, height: 45 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {artist.display_name}
                  </Typography>
                  <Typography variant="body2" color="gray" sx={{ fontWeight: 'bold' }}>
                    {artist.role}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
