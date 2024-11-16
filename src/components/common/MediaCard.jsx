import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MediaCard = ({ media, type }) => {
  return (
    <Link to={`/${type}/${media.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ overflow: "hidden", border: 'none', boxShadow: 'none', padding: '10px', backgroundColor:"#1f1f1f", color:"white" }}> 
        <CardMedia
          component="img"
          image={media.cover}
          alt={media.name}
          sx={{ height: "10vw", objectFit: "cover", borderRadius:"6px", width: "12vw" }}
        />
        <CardContent sx={{padding: "0"}}>
          <Typography variant="h10" component="div" noWrap sx={{fontSize: '1vw'}} >
            {media.name}
          </Typography>
          {
            media.artist && (
                <Typography variant="body2" color="white">
                    {media.artist} 
                </Typography>
            )
          }
        </CardContent>
      </Card>
     </Link>
  );
};

export default MediaCard;
