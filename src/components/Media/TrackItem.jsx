import React, { useState } from "react";
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

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderLeftSide = () => (
    <Box display="flex" alignItems="center" flex="1" overflow="hidden">
      {/* Playing Indicator */}
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <IconButton sx={{ color: red[500], marginX: "2%" }}>
            <PlayIcon />
          </IconButton>
        ) : (
          <Typography variant="body2" color="red" mr={2} ml={2} noWrap>
            {track.track_order}
          </Typography>
        )}
      </Box>

      <Divider orientation="vertical" flexItem sx={{ bgcolor: grey[500], mx: 1 }} />

      {/* Song Title */}
      <Box
        sx={{
          marginRight: type === "playlist" ? "10%" : "0%",
          width: type === "playlist" ? "20%" : "80%",
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

      {type === "playlist" && (
        <>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: grey[500], mx: 1 }} />
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
        </>
      )}
    </Box>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mr={1}
      sx={{
        backgroundColor: activeColor,
        "&:hover": {
          borderRadius: 1,
          backgroundColor: hoverColor,
        },
        transition: "background-color 0.3s ease",
        cursor: "pointer",
        width: "100%",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      {renderLeftSide()}
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
  );
};

export default TrackItem;
