import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const TrackCard = ({ track }) => {
  return (
    <Card
      sx={{
        width: "25em",
        height: "4em",
        display: "flex",
        alignItems: "start",
        borderRadius: "0.5em",
        boxShadow: "none",
        gap: "1em"
      }}
    >
      <CardMedia
        component="img"
        image={track.cover}
        alt={track.name}
        sx={{ width: "auto", height: "100%", borderRadius: "0.5em" }}
      />
      <CardContent sx={{padding: "0"}}>
        <Typography variant="h6" component="h5">
          {track.name}
        </Typography>
        <Typography variant="h6" component="h5" color="text.secondary">
          {track.artist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrackCard;