import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const StatCard = ({
  icon,
  title,
  value,
  chartData,
  chartColor,
}) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: chartColor, 
          font: {
            size: 10,
          },
        },
      },
      y: { display: false }, 
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2, borderColor: chartColor },
      point: { radius: 0 },
    },
  };

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        background: `linear-gradient(to bottom right, ${chartColor}10, white)`,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>{icon}</Box>
      </Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
        {title}
      </Typography>
      <Line data={chartData} options={chartOptions} />
    </Card>
  );
};

export default StatCard;
