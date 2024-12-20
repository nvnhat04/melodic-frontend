import React, { useEffect, useState } from "react";
import DenseTable from "../components/common/DenseTable";
import ArtistApi from "../api/modules/artist.api";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ArtistOrders = () => {
  const token = useSelector((state) => state.auth.token);

  const header = [
    { id: "order_id", label: "Order ID" },
    { id: "customer", label: "Customer" },
    { id: "status", label: "Status" },
    { id: "order_date", label: "Order Date" },
  ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchArtistOrders = async () => {
      try {
        const data = await ArtistApi.getOrders(token);
        console.log(data);
        const filteredData = data.map((order) => ({
          order_id: order.id,
          customer: order.user_id,
          status: order.status,
          order_date: new Date(order.order_date).toISOString().split("T")[0],
        }));
        console.log("filered: ", filteredData);
        setOrders(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtistOrders();
  }, []);

  return (
    <Box display="flex" gap={2} flexDirection="column" alignItems={"center"}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Orders
      </Typography>
      <DenseTable header={header} rows={orders} includeCheckbox={false} />
    </Box>
  );
};

export default ArtistOrders;
