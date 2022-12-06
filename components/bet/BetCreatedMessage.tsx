import { Box, Link as MuiLink, Typography } from "@mui/material";
import { CentralizedBox, XxlLoadingButton } from "components/styled";
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
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        🤟 Congrats, your bet is published!
      </Typography>
      {betLink && (
        <>
          {/* Link */}
          <Box sx={{ border: 3, borderRadius: 3, px: 4, py: 2, mb: 3 }}>
            <Link href={betLink} legacyBehavior passHref>
              <MuiLink sx={{ fontWeight: 700, textAlign: "center" }}>
                🔗 {betLink}
              </MuiLink>
            </Link>
          </Box>
          {/* Copy link button */}
          <XxlLoadingButton
            variant="contained"
            onClick={() => {
              navigator.clipboard.writeText(betLink);
              showToastSuccess("Link copied");
            }}
          >
            Copy Link
          </XxlLoadingButton>
        </>
      )}
    </CentralizedBox>
  );
}
