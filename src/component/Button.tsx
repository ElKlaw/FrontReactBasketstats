import { Button, withStyles } from "@material-ui/core";
import { indigo, teal } from "@material-ui/core/colors";

export const ButtonIndigo = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo[400]),
      backgroundColor: indigo[400],
      '&:hover': {
        backgroundColor: indigo[600],
      },
    },
}))(Button);

export const ButtonBase = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[400]),
    backgroundColor: teal[400],
    '&:hover': {
      backgroundColor: teal[600],
    },
  },
}))(Button);