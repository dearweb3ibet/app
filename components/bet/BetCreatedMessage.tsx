import { Telegram, Twitter } from "@mui/icons-material";
import { Box, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  CentralizedBox,
  ThickDivider,
  XxlLoadingButton,
} from "components/styled";
import useToasts from "hooks/useToast";
import Link from "next/link";

/**
 * A component with message that bet is published.
 */
export default function BetPublishedMessage(props: { id: string }) {
  const { showToastSuccess } = useToasts();
  const betLink = `${global.window.location.origin}/bets/${props.id}`;

  return (
    <CentralizedBox>
      {/* Title */}
      <Typography variant="h4" fontWeight={700}>
        🤟 Congrats, you made a bet!
      </Typography>
      <ThickDivider sx={{ mt: 6 }} />
      {betLink && (
        <Box sx={{ mt: 6 }}>
          {/* Buttons to share via social networks */}
          <Typography variant="h6" textAlign="center">
            Share this bet via
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <IconButton
              href={`https://twitter.com/intent/tweet?url=${betLink}`}
              target="_blank"
              color="primary"
              sx={{ border: 4, p: 3 }}
            >
              <Twitter sx={{ fontSize: 36 }} />
            </IconButton>
            <IconButton
              href={`https://t.me/share/url?url=${betLink}`}
              target="_blank"
              color="primary"
              sx={{ border: 4, p: 3 }}
            >
              <Telegram sx={{ fontSize: 36 }} />
            </IconButton>
          </Stack>
          {/* Link and copy button */}
          <Typography variant="h6" textAlign="center" sx={{ mt: 6 }}>
            Or copy link
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: 3,
                borderRadius: 5,
                px: 4,
              }}
            >
              <Link href={betLink} legacyBehavior passHref>
                <MuiLink sx={{ fontWeight: 700, textAlign: "center" }}>
                  🔗 {betLink}
                </MuiLink>
              </Link>
            </Box>
            <XxlLoadingButton
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(betLink);
                showToastSuccess("Link copied");
              }}
            >
              Copy
            </XxlLoadingButton>
          </Stack>
        </Box>
      )}
    </CentralizedBox>
  );
}
