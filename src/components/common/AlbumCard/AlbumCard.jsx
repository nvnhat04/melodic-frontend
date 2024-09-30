
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";


const AlbumCard = ({ album }) => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        height: "22vw",
        width:"22vw",
      }}
    >
      <Link to={`/album/${album.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={{ position: "relative", paddingTop: "100%" }}>
          <CardMedia
            component="img"
            image={album.cover}
            alt={album.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              padding: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="div">
              {album.name}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Card>
  );
};

export default AlbumCard;
