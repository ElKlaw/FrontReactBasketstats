import React from 'react';
import { createStyles, Dialog, IconButton, Theme } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CloseIcon from '@material-ui/icons/Close';
import { withStyles, WithStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      padding: 5,
      textAlign: "center"
    },
    closeButton: {
      position: 'absolute',
      right: 1,
      top: 1,
      color: grey[500],
    },
});
interface DialogTitleProps extends WithStyles<typeof styles> {
    children: React.ReactNode;
    onClose: () => void;
}
const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle className={classes.root} {...other}>
        {children}
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: 20,
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: 1,
    },
}))(MuiDialogActions);

interface CustomsDialogProps {
    title: React.ReactNode
    content: React.ReactNode
    action?: React.ReactNode
    isOpen: boolean
    handleClose: () => void
}
export default function CustomizedDialogs({title,content, action,handleClose,isOpen}:CustomsDialogProps) {  
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} maxWidth="lg" fullWidth={true}>
            <DialogTitle onClose={handleClose}>{title}</DialogTitle>
            <DialogContent dividers>
                {content}
            </DialogContent>
            {action &&
                <DialogActions>
                    {action}
                </DialogActions>
            }
        </Dialog>
    );
  }