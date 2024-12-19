import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StatCard from "./StatCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import ArtistApi from "../../api/modules/artist.api";
import { useSelector } from "react-redux";

const DashboardCards = () => {
  const artist_id = useSelector((state) => state.auth.user_id);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [weeklyCustomers, setWeeklyCustomers] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);

  const weeklyOrdersLabels = weeklyOrders.length
    ? weeklyOrders.map((order) =>
        new Date(order.order_date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      )
    : ["No Data"];

  const weeklyOrdersDataset = weeklyOrders.length
    ? weeklyOrders.map((order) => parseInt(order.order_count, 10))
    : [0];
  const totalWeeklyOrders = weeklyOrdersDataset.reduce(
    (sum, count) => sum + count,
    0
  );

  const weeklyCustomersLabels = weeklyCustomers.length
    ? weeklyCustomers.map((customer) =>
        new Date(customer.order_date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      )
    : ["No Data"];

  const weeklyCustomersDataset = weeklyCustomers.length
    ? weeklyCustomers.map((customer) => parseInt(customer.customer_count, 10))
    : [0];

  const totalWeeklyCustomers = weeklyCustomersDataset.reduce(
    (sum, count) => sum + count,
    0
  );

  const weeklySalesLabels = weeklySales.length
    ? weeklySales.map((sale) =>
        new Date(sale.order_date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      )
    : ["No Data"];

  const weeklySalesDataset = weeklySales.length
    ? weeklySales.map((sale) => parseInt(sale.sales, 10))
    : [0];

  const totalWeeklySales = weeklySalesDataset.reduce(
    (sum, count) => sum + count,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistApi.getWeeklyOrders(artist_id);
        setWeeklyOrders(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistApi.getWeeklyCustomers(artist_id);
        setWeeklyCustomers(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistApi.getWeeklySales(artist_id);
        console.log(response);
        setWeeklySales(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  const chartDataTemplate = (labels, datasets, color) => ({
    labels: labels,
    datasets: [
      {
        data: datasets,
        borderColor: color,
        backgroundColor: `${color}33`, // Add transparency to the color
        fill: true,
      },
    ],
  });
  const cards = [
    {
      icon: <ShoppingBagIcon fontSize="large" />,
      title: "Weekly Orders",
      value: totalWeeklyOrders,
      chartData: chartDataTemplate(
        weeklyOrdersLabels,
        weeklyOrdersDataset,
        "#42a5f5"
      ),
      chartColor: "#42a5f5",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      title: "New Customers",
      value: totalWeeklyCustomers,
      chartData: chartDataTemplate(
        weeklyCustomersLabels,
        weeklyCustomersDataset,
        "#ab47bc"
      ),
      chartColor: "#ab47bc",
    },
    {
      icon: <ShoppingCartIcon fontSize="large" />,
      title: "Weekly Sales",
      value: totalWeeklySales,
      chartData: chartDataTemplate(
        weeklySalesLabels,
        weeklySalesDataset,
        "#ffca28"
      ),
      chartColor: "#ffca28",
    },
    // {
    //   icon: <MailIcon fontSize="large" />,
    //   title: "Messages",
    //   value: "234",
    //   chartData: chartDataTemplate([], [], "#ef5350"), // Placeholder
    //   chartColor: "#ef5350",
    // },
  ];

  return (
    <Box display="flex" justifyContent="space-between" gap={2} flexWrap="wrap">
      {cards.map((card, index) => (
        <Box
          key={index}
          flex="1 1 calc(25% - 16px)"
          maxWidth="calc(25% - 16px)"
        >
          <StatCard {...card} />
        </Box>
      ))}
    </Box>
  );
};

export default DashboardCards;
