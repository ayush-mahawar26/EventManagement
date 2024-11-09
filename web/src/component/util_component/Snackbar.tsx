import { Snackbar, SnackbarCloseReason } from "@mui/material";
import { SetterOrUpdater } from "recoil";

export function CustomSnackbar({
  message,
  open,
  openState,
}: {
  message: string;
  open: boolean;
  openState: SetterOrUpdater<boolean>;
}) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    console.log(event);

    openState(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      message={message}
    />
  );
}
