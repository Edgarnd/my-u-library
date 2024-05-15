import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import propTypes from "prop-types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DialogCustom({isOpen, closeAction, title, actions, content}) {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={closeAction}
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
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

DialogCustom.propTypes = {
    isOpen: propTypes.bool,
    closeAction: propTypes.func,
    title: propTypes.string,
    content: propTypes.any,
    actions: propTypes.any
}