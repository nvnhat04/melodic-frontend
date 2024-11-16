import React from "react";
import { useState } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayArrow";
import { useTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

import SongMenu from "./TrackMenu";

const TrackItem = ({ track, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  const theme = useTheme();
  const hoverColor = grey[600];
  const activeColor = grey[900];
  const textColor = grey[400];

  const onPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatDuration = ({ duration }) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = Math.floor(track.duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {type === "playlist" && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          ml={1}
          mr={1}
          sx={{
            backgroundColor: activeColor,
            "&:hover": {
              borderRadius: 1,
              backgroundColor: hoverColor,
            },
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            width: "100%", // Take full width of container
            flexWrap: "wrap", // Allow wrapping on small screens
            overflow: "hidden",
          }}
        >
          {/* Left Side: Song Info */}
          <Box display="flex" alignItems="center" flex="1" overflow="hidden">
            {/* Playing Indicator */}

            <Box
              onMouseEnter={() => setIsHovered(true)} // Kích hoạt khi hover vào
              onMouseLeave={() => setIsHovered(false)} // Tắt khi không hover nữa
            >
              {isHovered ? (
                <IconButton
                  sx={{
                    color: red[500],
                    marginX: "2%",
                  }}
                >
                  <PlayIcon />
                </IconButton>
              ) : (
                <Typography variant="body2" color="red" mr={2} ml={2} noWrap>
                  {track.track_order}
                </Typography>
              )}
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: grey[500], mx: 1 }}
            />

            {/* Song Title */}
            <Box
              sx={{
                marginRight: "10%",
                width: "20%",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                color={textColor}
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {track.title}
              </Typography>
            </Box>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: grey[500], mx: 1 }}
            />

            {/* Artist */}
            <Typography
              variant="body2"
              color={textColor}
              mr={2}
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {track.artist}
            </Typography>
          </Box>

          {/* Right Side: Duration */}
          <Typography variant="body2" color={textColor} noWrap>
            {formatDuration(track.duration)}
          </Typography>
          <SongMenu
            songId={track.track_order}
            bgColor={activeColor}
            moreColor={textColor}
          />
        </Box>
      )}
      {type === "album" && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          ml={1}
          mr={1}
          sx={{
            backgroundColor: activeColor,
            "&:hover": {
              borderRadius: 1,
              backgroundColor: hoverColor,
            },
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            width: "100%", // Take full width of container
            maxWidth: "100%", // Take full width of container
            flexWrap: "wrap", // Allow wrapping on small screens
            overflow: "hidden",
          }}
        >
          {/* Left Side: Song Info */}
          <Box display="flex" alignItems="center" flex="1" overflow="hidden">
            {/* Playing Indicator */}

            <Box
              onMouseEnter={() => setIsHovered(true)} // Kích hoạt khi hover vào
              onMouseLeave={() => setIsHovered(false)} // Tắt khi không hover nữa
            >
              {isHovered ? (
                <IconButton
                  sx={{
                    color: red[500],
                    marginX: "2%",
                  }}
                >
                  <PlayIcon />
                </IconButton>
              ) : (
                <Typography variant="body2" color="red" mr={2} ml={2} noWrap>
                  {track.track_order}
                </Typography>
              )}
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: grey[500], mx: 1 }}
            />

            {/* Song Title */}
            <Box
              sx={{
                width: "80%",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                color={textColor}
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {track.title}
              </Typography>
            </Box>
          </Box>

          {/* Right Side: Duration */}
          <Typography variant="body2" color={textColor} noWrap>
            {formatDuration(track.duration)}
          </Typography>
          <SongMenu
            songId={track.track_order}
            bgColor={activeColor}
            moreColor={textColor}
          />
        </Box>
      )}
    </>
  );
};

export default TrackItem;
