import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MerchandiseCard = ({ merchandise, hoverEffect }) => {
  return (
    <Link
      to={`/merchandise/${merchandise.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          position: "relative",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: hoverEffect === "scale" ? "scale(1.05)" : "none",
            boxShadow: hoverEffect === "scale" ? "0px 10px 15px rgba(0, 0, 0, 0.2)" : "none",
          },
          "&:before": hoverEffect === "blur" && {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "gray", // Lớp phủ làm mờ
            opacity: 0,
            transition: "opacity 0.3s",
            zIndex: 1,
          },
          "&:hover:before": hoverEffect === "blur" && {
            opacity: 0.1,
          },
        }}
      >
        <CardMedia
          component="img"
          image={merchandise.cover}
          alt={merchandise.name}
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
            position: hoverEffect === "blur" ? "relative" : "static",
            zIndex: hoverEffect === "blur" ? 0 : "auto",
          }}
        />
        <CardContent sx={{ padding: "0" }}>
          <Typography
            variant="h10"
            component="div"
            textAlign="center"
            marginTop="1vw"
            noWrap
          >
            {merchandise.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MerchandiseCard;
