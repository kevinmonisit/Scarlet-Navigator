import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  // eslint-disable-next-line react/no-unused-prop-types
  handleConfirmation: () => void;
  buttonLabel: string;
  dialogText: string;
  dialogTitle: string;
  primary?: boolean;
}

function AlertDialog(props: AlertDialogProps) {
  const { handleConfirmation, buttonLabel, dialogText, dialogTitle, primary } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    handleClose();
    handleConfirmation();
  };

  return (
    <div className="my-2">
      <Button variant={primary ? 'contained' : 'outlined'} onClick={handleClickOpen}>
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={handleAgree} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.defaultProps = {
  primary: false
};

export default AlertDialog;
