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
import BetList from "components/bet/BetList";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import { ethChartLabels, ethChartValues, ethLastBets } from "data/mock";
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

export const ethChartData = {
  labels: ethChartLabels,
  datasets: [
    {
      label: "USD",
      data: ethChartValues,
      borderColor: "#2B6EFD",
      backgroundColor: "#2B6EFD",
    },
  ],
};

/**
 * Page with bets.
 *
 * TODO: Use real data instead of mock data
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
        <BetList bets={ethLastBets} />
      </CentralizedBox>
    </Layout>
  );
}
