import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          padding: "10px",
          backgroundColor: "#1f1f1f",
          color: "white",
        }}
      >
        <CardMedia
          component="img"
          image={playlist.cover}
          alt={playlist.name}
          sx={{
            height: {
              xs: "30vw",
              sm: "20vw",
              md: "15vw",
              lg: "10vw",
              xl: "8vw",
            },
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
        <CardContent sx={{ padding: "0" }}>
          <Typography variant="h10" component="div" noWrap>
            {playlist.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
