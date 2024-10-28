import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const TrackCard = ({ track }) => {
  return (
    <Card
      sx={{
        width: "20em",
        display: "flex",
        borderRadius: "0.5em",
        boxShadow: "none",
        padding: "10px",
        gap: "1em"
      }}
    >
      <CardMedia
        component="img"
        image={track.cover}
        alt={track.name}
        sx={{ width: "auto", height: "5em", borderRadius: "0.5em" }}
      />
      <CardContent sx={{ flexBasis: "auto", flexGrow:"1", padding: "0" }}>
        <Typography sx={{fontSize: "1.5em"}} component="div">
          {track.name}
        </Typography>
        <Typography color="text.secondary">
          {track.artist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
