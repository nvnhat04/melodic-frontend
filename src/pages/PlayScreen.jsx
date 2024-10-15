import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Box, Typography, IconButton, Slider, Icon } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Vibrant from 'node-vibrant';
import { FastRewindRounded, FavoriteBorderOutlined } from '@mui/icons-material';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const PlayScreen = () => {
    const [gradient, setGradient] = useState('linear-gradient(45deg, #000000, #333333)');
    const imageRef = useRef(null);
  
    // Function to extract colors and create gradient
    const extractColors = async () => {
        const imgSrc = imageRef.current.src;
        console.log(imgSrc);
        try {
          const vibrant = new Vibrant(imgSrc);
          const palette = await vibrant.getPalette();
          console.log(palette);
    
          // Check if colors exist before accessing
          const vibrantColor = palette.Vibrant ? palette.Vibrant.rgb : [0, 0, 0];
          const mutedColor = palette.Muted ? palette.Muted.rgb : [50, 50, 50];
          console.log(vibrantColor);
          console.log(mutedColor);
    
          setGradient(`linear-gradient(90deg, rgb(${vibrantColor.join(',')}), rgb(${mutedColor.join(',')}))`);
          console.log(gradient);
        } catch (error) {
          console.error('Error extracting colors:', error);
        }
      };
    
    // Extract colors once the image loads
    useEffect(() => {
      const img = imageRef.current;
      console.log(img);
      if (img.complete) {
        extractColors();
      } else {
        img.addEventListener('load', extractColors);
      }
      return () => {
        if (img) {
          img.removeEventListener('load', extractColors);
        }
      };
    }, []);
  
  return (
    <Box
      sx={{
        backgroundImage: gradient, 
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.5s ease',
      }}
    >
      <Box
        sx={{
          width: 500,
          borderRadius: '16px',
          padding: 'none',
        }}
      >
        {/* Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 , mt: 2 }}>
          <img
            ref={imageRef}
            src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb-60.jpg"
            alt="Song cover"
            style={{
              width: '100%',
              borderRadius: '16px',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', mb: 2 }}>
        

        <Box>
          {/* Song Info */}
        <Typography variant="h5" color="white" textAlign="left" sx={{
          fontWeight: 600,
          fontFamily: 'Arial',
          fontSize: '18px',
          letterSpacing: '0px',
        }}>
        
          Allmost had it all
        </Typography>
        <Typography variant="h5" color="#a5bfd2" textAlign="left" gutterBottom sx={{
          fontWeight: 600,
          fontFamily: 'Arial',
          fontSize: '18px',
          letterSpacing: '0px',
        }}>
          tlinh, 2pillz
        </Typography>
        </Box>
        {/* Action Buttons */}
        <Box
          sx={{
            ml: 'auto',
            display: 'flex'

          }}
        >
          <IconButton>
            <FavoriteBorderOutlined sx={{ color:'white'}}></FavoriteBorderOutlined>
          </IconButton>
          <IconButton>
            <MoreVertIcon sx={{ color: 'white'}}></MoreVertIcon>
          </IconButton>
          </Box>
        </Box>

        {/* Slider */}
        <Slider
          aria-label="time-indicator"
          size="medium"
          value={30} // Progress value for slider (example)
          sx={{
            color: '#a5bfd2',
            height: 5,
            '& .MuiSlider-thumb': { display: 'none' },
          }}
        />

        {/* Time */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#a5bfd2',
            fontSize: '0.75rem',
            mt: -1,
            fontFamily: 'Arial'
          }}
        >
          <span>0:52</span>
          <span>-3:32</span>
        </Box>

        {/* Playback Controls */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 0.5,
          }}
        >
          <IconButton>
            <FastRewindRounded sx={{ color: 'white', fontSize: 50}} />
          </IconButton>
          <IconButton sx={{ mx: 2 }}>
            <PlayArrowRoundedIcon sx={{ color: 'white', fontSize: 50 }} />
            {/* Replace PlayArrowIcon with PauseIcon when song is playing */}
          </IconButton>
          <IconButton>
            <FastForwardRoundedIcon sx={{ color: 'white', fontSize: 50 }}></FastForwardRoundedIcon>
          </IconButton>

        </Box>
      </Box>
    </Box>
  );
}

export default PlayScreen;