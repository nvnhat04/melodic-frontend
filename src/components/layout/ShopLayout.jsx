import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../common/Topbar";

const ShopLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <TopBar></TopBar>
      <Outlet />
    </Box>
  );
};

export default ShopLayout;
