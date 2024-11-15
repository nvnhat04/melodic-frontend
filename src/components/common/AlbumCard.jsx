import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} style={{ textDecoration: "none" }}>
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
          image={album.cover}
          alt={album.name}
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
            {album.name}
          </Typography>
          <Typography variant="body2" color="white">
            {album.artist}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AlbumCard;
