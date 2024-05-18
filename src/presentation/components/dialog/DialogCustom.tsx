import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type DialogCustomProps = {
  isOpen: boolean,
  closeAction?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  title: string,
  content: React.ReactNode,
  actions: React.ReactNode,
  formAction?: React.FormEventHandler<HTMLFormElement> | undefined
}

const DialogCustom: React.FC<DialogCustomProps> = ({ isOpen, closeAction, title, actions, content, formAction }) => {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={(e: any) => {
          if (closeAction !== null && closeAction !== undefined) {
            closeAction(e);
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeAction}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={formAction}>
          <DialogContent dividers>
            {content}
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default DialogCustom;