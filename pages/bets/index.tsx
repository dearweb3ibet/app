import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const chartLabels = [
  "December '22",
  "January '23",
  "February '23",
  "March '23",
  "April '23",
  "May '23",
  "June '23",
  "July '23",
];

// Mock data
// TODO: Replace mock data with real data from contract
export const ethChartData = {
  labels: chartLabels,
  datasets: [
    {
      label: "USD",
      data: [2200, 2600, 2000, 4800, 5200, 2000, 5000, 8000],
      borderColor: "#2B6EFD",
      backgroundColor: "#2B6EFD",
    },
  ],
};

/**
 * Page with bets.
 */
export default function Bets() {
  return (
    <Layout>
      <CentralizedBox>
        {/* Title */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          ETH
        </Typography>
        {/* Trend */}
        <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
          📈 Trend based on bets published by all accounts
        </Typography>
        <Box sx={{ width: 720, mb: 3 }}>
          <Line options={chartOptions} data={ethChartData} />
        </Box>
        {/* Last bets */}
        <Divider sx={{ width: 540, mt: 5, mb: 5 }} />
        <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
          🤝 Last bets
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
          ...
        </Typography>
      </CentralizedBox>
    </Layout>
  );
}
