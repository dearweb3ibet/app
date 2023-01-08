import { Dialog, DialogContent } from "@mui/material";
import BetSubscribeForm from "components/bet/BetSubscribeForm";
import { useState } from "react";

/**
 * Dialog to subscribe for bet updates.
 */
export default function BetSubscribeDialog(props: {
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
        <BetSubscribeForm id={props.id} />
      </DialogContent>
    </Dialog>
  );
}
