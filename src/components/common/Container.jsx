import React from "react";
import { Box, Typography } from "@mui/material";

const Container = ({ header, children }) => {
  return (
    <Box sx={{ display: "flex", flexFlow: "column nowrap", gap: "10px" }}>
      {header && (
        <Typography
          sx={{
            fontFamily: '"Roboto", sans-serif',
            fontSize: "1rem",
            fontWeight: "700",
            color: "white",
            textTransform: "uppercase",
            position: "relative",
            "&::after": { 
              content: '""',
              display: "block",
              position: "relative",
              width: "4em",
              left: 0,
              right: 0,
              bottom: "1px",
              height: ".25em",
              background: "#e75565",
            }, 
          }}
        >
          {header}
        </Typography>
      )}
      <Box>{children}</Box>
    </Box>
  );
};

export default Container;
