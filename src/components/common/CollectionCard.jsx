import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import createUrl from "../../hooks/createUrl";
import { useState, useEffect } from "react";

const CollectionCard = ({ collection, type }) => {
  const [coverUrl, setCoverUrl] = useState("");
  useEffect(() => {
    if (collection.cover) {
      setCoverUrl(createUrl(collection.cover));
    } else {
      setCoverUrl(createUrl("1uPpcuN038RVhwU-IHLHSsCxG61lpCHay"));
    }
  }, [collection.cover]);
  const handlePlay = (event) => {
    event.preventDefault();
    //play
  };
  return type === "Album" ? (
    <Link to={`/album/${collection.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          padding: "5%",
          backgroundColor: "#1f1f1f",
          color: "white",
          maxWidth: "200px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            image={collection.cover && collection.cover.startsWith("http") ? collection.cover : coverUrl}
            alt={collection.title}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "6px",
              position: "relative",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "90%",
              aspectRatio: "1 / 1",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(231,85,101, 0.8)",
                },
              }}
              onClick={handlePlay}
            >
              <PlayArrowIcon sx={{ color: "white", fontSize: "30px" }} />
            </Box>
          </Box>
        </Box>
        <CardContent sx={{ padding: "0", margin: "5%" }}>
          <Typography component="div" noWrap>
            {collection.title}
          </Typography>
          {collection.release_date && (
            <Typography color="white">
              {new Date(collection.release_date).getFullYear()}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  ) : (
    <Link to={`/playlist/${collection.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          padding: "5%",
          backgroundColor: "#1f1f1f",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            image={collection.cover && collection.cover.startsWith("http") ? collection.cover : coverUrl}
            alt={collection.name}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "6px",
              position: "relative",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "90%",
              aspectRatio: "1 / 1",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(231,85,101, 0.8)",
                },
              }}
              onClick={handlePlay}
            >
              <PlayArrowIcon sx={{ color: "white", fontSize: "30px" }} />
            </Box>
          </Box>
        </Box>
        <CardContent
          sx={{
            padding: "0",
            display: "flex",
            justifyContent: "center",
            margin: "5%",
          }}
        >
          <Typography component="div" noWrap>
            {collection.name}
          </Typography>
          <Typography color="white">{collection.release_date}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollectionCard;
