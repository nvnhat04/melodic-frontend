import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import TrackCard from "../common/TrackCard";

const TopMusicSection = ({ title, items }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5">{title}</Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        {items.map((item) => (
          <TrackCard key={item.name} track={item} />
        ))}
      </List>
    </Box>
  );
};

export default TopMusicSection;
