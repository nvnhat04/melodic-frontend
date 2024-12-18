import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import createURL from "../../hooks/createUrl";

const ArtistCard = ({ artist }) => {
  return (
    <Link to={`/artist/${artist.id || artist.artist_id}`} style={{ textDecoration: "none" }}>
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
          image={artist.avatar && artist.avatar.startsWith("http") ? artist.avatar : createURL(artist.avatar)}
          alt={artist.name || artist.display_name || artist.artist_name}
          sx={{
            objectFit: "cover",
            borderRadius: "50%",
            aspectRatio: "1 / 1",
          }}
        />
        <CardContent sx={{ padding: "0" }}>
          <Typography variant="h10" component="div" noWrap textAlign={"center"}>
            {artist.name || artist.display_name || artist.artist_name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArtistCard;
