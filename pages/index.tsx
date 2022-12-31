import { Link as MuiLink, Typography, SxProps, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/layout";
import {
  CentralizedBox,
  ThickDivider,
  XxlLoadingButton,
} from "components/styled";
import Link from "next/link";

/**
 * Home page.
 */
export default function Home() {
  return (
    <Layout>
      <CentralizedBox>
        {/* Title */}
        <Box>
          <Typography
            variant="h1"
            fontWeight={700}
            textAlign="center"
            sx={{ mt: 4 }}
          >
            Let's{" "}
            <Link href="/bets/new" legacyBehavior passHref>
              <MuiLink>move</MuiLink>
            </Link>{" "}
            from words to bets on the blockchain!
          </Typography>
        </Box>
        <ThickDivider sx={{ mt: 8 }} />
        {/* How does it work */}
        <Box sx={{ mt: 8, width: 1 }}>
          <Typography variant="h4" fontWeight={700} textAlign="center">
            How does it work?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: "repeat(2, 1fr)",
              mt: 4,
            }}
          >
            <StepCard
              icon="🤞"
              title="1. Make a bet about the future crypto price"
              color="#2B6EFD"
            />
            <StepCard
              icon="🤞"
              title="2. Invite friends and followers"
              color="#410C92"
            />
            <StepCard icon="🤞" title="3. Win or lose" color="#9747FF" />
            <StepCard icon="🤞" title="4. Earn rating" color="#1DB954" />
          </Box>
        </Box>
        <XxlLoadingButton variant="contained" href="/bets/new" sx={{ mt: 4 }}>
          Make Bet
        </XxlLoadingButton>
      </CentralizedBox>
    </Layout>
  );
}

function StepCard(props: {
  icon: string;
  title: string;
  color?: string;
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: props.color || "#000000",
        p: 4,
        borderRadius: 3,
        ...props.sx,
      }}
    >
      <Avatar
        sx={{
          width: 72,
          height: 72,
          borderRadius: 72,
          backgroundColor: "#FFFFFF",
          fontSize: 32,
          mb: 2,
        }}
      >
        {props.icon}
      </Avatar>
      <Typography
        variant="h6"
        fontWeight={700}
        textAlign="center"
        color="#FFFFFF"
        sx={{ maxWidth: 280 }}
      >
        {props.title}
      </Typography>
    </Box>
  );
}
