import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({
  open,
  disconnectClose,
  disconnectConfirm,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(350));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={disconnectClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure want to disconnect?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can connect with us whenever you want to receive updates on your
            account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={disconnectClose}>
            CANCEL
          </Button>
          <Button onClick={disconnectConfirm} autoFocus>
            DISCONNECT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
