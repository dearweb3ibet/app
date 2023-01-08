import { Typography } from "@mui/material";
import { CentralizedBox, ThickDivider } from "components/styled";
import BetShareActions from "./BetShareActions";
import BetSubscribeForm from "./BetSubscribeForm";

/**
 * A component with message that bet is created.
 */
export default function BetCreatedMessage(props: { id: string }) {
  return (
    <CentralizedBox>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        🤟 Congrats, you made a bet!
      </Typography>
      <ThickDivider sx={{ mt: 5 }} />
      <BetShareActions id={props.id} sx={{ mt: 6 }} />
      <ThickDivider sx={{ mt: 6 }} />
      <BetSubscribeForm id={props.id} sx={{ mt: 6 }} />
    </CentralizedBox>
  );
}
