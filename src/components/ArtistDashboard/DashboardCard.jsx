import React, { useEffect, useState } from "react";
import { Box, Card, Divider } from "@mui/material";
import StatCard from "./StatCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ArtistApi from "../../api/modules/artist.api";
import { useSelector } from "react-redux";
import { CardContent, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MostPopular = ({ tracks }) => {
  return (
    <Card elevation={3} sx={{}}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Most Popular Tracks
        </Typography>
        <Divider
          sx={{
            marginTop: 1,
            marginBottom: 2,
            borderWidth: "1.7px",
            backgroundColor: "#243870",
          }}
        />
        {tracks.map((track, index) => (
          <Box
            key={track.id}
            display="flex"
            justifyContent="space-between"
            mb={1}
            sx={{ borderBottom: "1px solid #ddd", paddingBottom: 1 }}
          >
            <Typography variant="body1" fontWeight="bold">
              {index + 1}. {track.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "darkgreen" }}>
              {track.play_count}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

const DashboardCards = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "san-serif"].join(","),
    },
  });
  const artist_id = useSelector((state) => state.auth.user_id);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [weeklyCustomers, setWeeklyCustomers] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [weeklyStreams, setWeeklyStreams] = useState([]);
  const [mostPlayedTracks, setMostPlayedTracks] = useState([]);
  const [merchandiseTypes, setMerchandiseTypes] = useState([]);

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

  const weeklyStreamsLabels = weeklyStreams.length
    ? weeklyStreams.map((stream) =>
        new Date(stream.played_date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      )
    : ["No Data"];

  const weeklyStreamsDataset = weeklyStreams.length
    ? weeklyStreams.map((stream) => parseInt(stream.play_count, 10))
    : [0];

  const totalWeeklyStreams = weeklyStreamsDataset.reduce(
    (sum, count) => sum + count,
    0
  );

  const merchandiseTypesLabels = merchandiseTypes.length
    ? merchandiseTypes.map((type) => type.category)
    : ["No Data"];

  const merchandiseTypesDataset = merchandiseTypes.length
    ? merchandiseTypes.map((type) => parseInt(type.count, 10))
    : [0];

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
        setWeeklySales(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistApi.getWeeklyStreams(artist_id);
        setWeeklyStreams(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistApi.getMostPlayedTracks(artist_id);
        setMostPlayedTracks(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistApi.getMerchandiseTypes(artist_id);
        setMerchandiseTypes(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artist_id]);

  const chartDataTemplate = (labels, datasets, color, type = "bar") => {
    if (type === "pie") {
      const colors = labels.map(
        (_, i) => `hsl(${(i * 360) / labels.length}, 70%, 50%)`
      );
      return {
        labels: labels,
        datasets: [
          {
            data: datasets,
            backgroundColor: colors,
            borderColor: colors.map((c) => c.replace(/50%/, "40%")), // Darker shade for border
          },
        ],
      };
    }

    return {
      labels: labels,
      datasets: [
        {
          data: datasets,
          borderColor: color,
          backgroundColor: `${color}`,
          fill: true,
        },
      ],
    };
  };

  const cards = [
    {
      icon: <ShoppingCartIcon fontSize="large" />,
      title: "Weekly Orders",
      value: totalWeeklyOrders,
      chartData: chartDataTemplate(
        weeklyOrdersLabels,
        weeklyOrdersDataset,
        "#035096"
      ),
      iconColor: "#035096",
      type: "line",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      title: "Customers",
      value: totalWeeklyCustomers,
      chartData: chartDataTemplate(
        weeklyCustomersLabels,
        weeklyCustomersDataset,
        "#ab47bc"
      ),
      iconColor: "#ab47bc",
      type: "bar",
    },
    {
      icon: <ShoppingBagIcon fontSize="large" />,
      title: "Weekly Sales",
      value: totalWeeklySales,
      chartData: chartDataTemplate(
        weeklySalesLabels,
        weeklySalesDataset,
        "#EF6F2F"
      ),
      iconColor: "#EF6F2F",
    },
    {
      icon: <MusicNoteIcon fontSize="large" />,
      title: "Weekly Streams",
      value: totalWeeklyStreams,
      chartData: chartDataTemplate(
        weeklyStreamsLabels,
        weeklyStreamsDataset,
        "#ef5350"
      ),
      iconColor: "#ef5350",
    },
    {
      icon: <ShoppingCartIcon fontSize="large" />,
      title: "Merchandise Types",
      chartData: chartDataTemplate(
        merchandiseTypesLabels,
        merchandiseTypesDataset,
        "#66bb6a",
        "pie"
      ),
      iconColor: "#66bb6a",
      type: "pie",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" gap={3} p={1}>
        {/* Row 1 */}
        <Box display="flex" gap={2} flex="1">
          <Box flex="1">
            <StatCard {...cards[4]} />
          </Box>
          <Box flex="4">
            <StatCard {...cards[2]} />
          </Box>
        </Box>

        {/* Row 2 */}
        <Box display="flex" gap={2} flex="1">
          <Box flex="2" minWidth="0">
            <StatCard {...cards[1]} />
          </Box>
          <Box flex="1" minWidth="0">
            <MostPopular tracks={mostPlayedTracks} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardCards;
