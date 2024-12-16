import React from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const categories = [
  { title: "R&B", image: "../../genres/rnb.jpg" },
  { title: "RAP", image: "../../genres/rap.jpg" },
  { title: "HIP-HOP", image: "../../genres/hiphop.jpg" },
  { title: "BALLAD", image: "../../genres/ballad.jpg" },
  { title: "CHILL", image: "../../genres/chill.jpg" },
  { title: "COUNTRY", image: "../../genres/country.jpg" },
  { title: "SAD", image: "../../genres/sad.jpg" },
  { title: "ROCK", image: "../../genres/rock.jpg" },
  { title: "INDIE", image: "../../genres/indie.jpg" },
  { title: "POP", image: "../../genres/pop.jpg" },
  { title: "JAZZ", image: "../../genres/jazz.jpg" },
  { title: "K-POP", image: "../../genres/kpop.jpg" },
];

const BrowseCategories = () => {
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#121212",
        minHeight: "calc(100vh + 200px)",
      }}
    >
      <Typography
        variant="h4"
        style={{ color: "gray", marginBottom: "1.5rem", fontWeight: "bold" }}
      >
        Browse Categories
      </Typography>
      <Grid
        container
        spacing={5}
        justifyContent="center" // Center the grid items horizontally
      >
        {categories.map((category, index) => (
          <Grid
            item
            key={index}
            sx={{
              flex: "0 0 auto", // Prevent grid items from stretching
              width: {
                xs: "100%", // Full width on extra small devices
                sm: "48%", // Two items per row on small devices
                md: "37%", // Three items per row on medium devices
                lg: "22%", // Four items per row on large devices
              }, // Fixed width for each card
            }}
          >
            <Link
              to={`/genre?id=${encodeURIComponent(category.title.toLowerCase())}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    filter: "brightness(70%)",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {category.title}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BrowseCategories;
