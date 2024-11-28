import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { styled } from "@mui/material/styles";

const DecreaseIcon = styled(SouthEastIcon)({
  color: "red",
  fontSize: "2em",
});

const IncreaseIcon = styled(NorthEastIcon)({
  color: "green",
  fontSize: "2em",
});

const StatCard = ({ title, value, percentageChange, increase }) => {
  return (
    <Paper
      elevation={4}
      square={false}
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-evenly",
        alignItems: "space-evenly",
        padding: "0.5em 1em",
        width: "14em",
        height: "10em",
        borderRadius: "1em",
      }}
    >
      <Typography variant="body1" component="h2">
        {title}
      </Typography>
      <Typography variant="h4" component="h3" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
      <Box component="div" sx={{ display: "flex" }}>
        {increase ? <IncreaseIcon /> : <DecreaseIcon />}
        <Typography
          variant="h5"
          component="h3"
          color={increase ? "green" : "red"}
          sx={{ fontWeight: "bold" }}
        >
          {percentageChange}%
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
