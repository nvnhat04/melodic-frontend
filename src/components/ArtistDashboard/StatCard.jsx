import React from "react";
import { Card, Typography, Box } from "@mui/material";
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
}) => {
  const chartOptions = {
    responsive: true,
    aspectRatio: type === "pie" ? 1 : 4,
    plugins: {
      legend: {
        display: type === "pie", // Ensure legend is shown for pie charts
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 12,
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
                color: chartColors[0] || "black",
                font: {
                  size: 10,
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

  console.log("chart labels;", chartData.labels);
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 4,
        boxShadow: 3,
        background: `linear-gradient(to bottom right, ${
          chartColors[0] || "black"
        }10, white)`,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <span
            style={{
              color: chartColors[0] || "black",
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
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
      {type === "line" && <Line data={chartData} options={chartOptions} />}
      {type === "bar" && <Bar data={chartData} options={chartOptions} />}
      {type === "pie" && <Pie data={chartData} options={chartOptions} />}
    </Card>
  );
};

export default StatCard;
