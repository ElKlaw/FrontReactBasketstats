import { Button } from "@material-ui/core";
import { blueGrey, indigo, teal } from "@material-ui/core/colors";

import { withStyles } from "@material-ui/styles";
import { important } from "csx";

export const ButtonIndigo = withStyles((theme) => ({
    root: {
      color: "white",
      backgroundColor: indigo[400],
      '&:hover': {
        backgroundColor: indigo[600]
      }
    }
}))(Button);

export const ButtonBase = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: teal[400],
    '&:hover': {
      backgroundColor: teal[600]
    }
  }
}))(Button);


export const ButtonGris = withStyles((theme) => ({
  root: {
    color: blueGrey[700],
    backgroundColor: "white",
    border : `1px solid ${blueGrey[700]}`,
    '&:hover': {
      border : `1px solid ${important(blueGrey[700])}`
    }
  },
  selected : {
    color: "red",
    backgroundColor: "red"
  }
}))(Button);