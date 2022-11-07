import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import BetList from "components/bet/BetList";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import { ethChartData, ethLastBets } from "data/mock";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

/**
 * Page with bets.
 *
 * TODO: Use real data instead of mock data
 */
export default function Bets() {
  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          text: "Days from Now",
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          text: "USD",
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

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
          <Bubble
            options={chartOptions}
            data={{
              datasets: [
                {
                  label: "Avg USD Price",
                  data: ethChartData,
                  backgroundColor: "rgba(43, 110, 253, 0.5)",
                },
              ],
            }}
          />
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
