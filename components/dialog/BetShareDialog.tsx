import { Dialog, DialogContent } from "@mui/material";
import BetShareActions from "components/bet/BetShareActions";
import { useState } from "react";

/**
 * Dialog to share bet.
 */
export default function BetShareDialog(props: {
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
        <BetShareActions id={props.id} />
      </DialogContent>
    </Dialog>
  );
}
