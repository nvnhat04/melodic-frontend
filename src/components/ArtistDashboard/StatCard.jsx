import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Legend
);

const StatCard = ({
  type = "line",
  icon,
  title,
  value,
  chartData,
  chartColors = [],
  iconColor,
}) => {
  const chartOptions = {
    responsive: true,
    aspectRatio: type === "pie" ? 1 : 4,
    plugins: {
      legend: {
        display: type === "pie",
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 15,
          },
        },
      },
    },
    scales:
      type !== "pie"
        ? {
            x: {
              display: true,
              ticks: {
                color: chartColors[0] || iconColor || "black",
                font: {
                  size: 15,
                  weight: "bold",
                },
              },
            },
            y: { display: false },
          }
        : {},
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: chartColors[0] || "black",
      },
      point: { radius: 0 },
    },
  };

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        borderWidth: "10px",
        borderColor: chartColors[0] || iconColor || "#f94c57",
        boxShadow: 2,
        background: `linear-gradient(to bottom right, ${
          chartColors[0] || "black"
        } 10, white)`,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <span
            style={{
              color: chartColors[0] || iconColor || "#f94c57",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {icon}
          </span>
        </Box>
      </Box>
      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>
      <Typography color="#132248">{title}</Typography>
      <Divider
        sx={{
          marginTop: 1,
          marginBottom: 2,
          borderWidth: "1.7px",
          backgroundColor: "#243870",
        }}
      />
      {type === "line" && <Line data={chartData} options={chartOptions} />}
      {type === "bar" && <Bar data={chartData} options={chartOptions} />}
      {type === "pie" && <Pie data={chartData} options={chartOptions} />}
    </Card>
  );
};

export default StatCard;
