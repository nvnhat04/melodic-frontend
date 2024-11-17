import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MechandiseCard = ({ merchandise }) => {
    return (
      <Link to={`/merchandise/${merchandise.id}`} style={{ textDecoration: "none" }}>
        <Card sx={{ overflow: "hidden", border: 'none', boxShadow: 'none', padding: '10px', backgroundColor:"#1f1f1f", color:"white" }}> 
          <CardMedia
            component="img"
            image={merchandise.cover}
            alt={merchandise.name}
            sx={{ height: "10vw", objectFit: "cover", borderRadius:"6px" }}
          />
          <CardContent sx={{padding: "0"}}>
            <Typography variant="h10" component="div" noWrap >
              {merchandise.name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  };
  
  export default MechandiseCard;