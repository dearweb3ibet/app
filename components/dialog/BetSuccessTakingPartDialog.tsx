import { Dialog, DialogContent, Typography } from "@mui/material";
import BetShareActions from "components/bet/BetShareActions";
import BetSubscribeForm from "components/bet/BetSubscribeForm";
import { ThickDivider } from "components/styled";
import { useState } from "react";

/**
 * Dialog to display actions after successfully taking part in a bet.
 */
export default function BetSuccessTakingPartDialog(props: {
  id: string;
  isClose?: boolean;
  onClose?: Function;
}) {
  const [isOpen, setIsOpen] = useState(!props.isClose);

  async function close() {
    setIsOpen(false);
    props.onClose?.();
  }

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="sm" fullWidth>
      <DialogContent sx={{ my: 2 }}>
        <Typography variant="h5" textAlign="center" fontWeight={700}>
          🎉 You are now a bet participant!
        </Typography>
        <ThickDivider sx={{ mt: 4 }} />
        <BetShareActions id={props.id} sx={{ mt: 5 }} />
        <ThickDivider sx={{ mt: 5 }} />
        <BetSubscribeForm id={props.id} sx={{ mt: 5 }} />
      </DialogContent>
    </Dialog>
  );
}
