import React from 'react';
import { Dialog, IconButton, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';
import { withStyles, WithStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';

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
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
                size="large">
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