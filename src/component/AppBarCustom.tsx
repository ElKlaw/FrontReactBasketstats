import React from "react";
import { AppBar, Avatar, Badge, Grid, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { blueGrey, red } from "@material-ui/core/colors";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "@material-ui/core";

interface Props {
    isConnect: boolean
    history: any
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "white",
      padding: theme.spacing(1),
      minHeight: "auto"
    },
    toolbar: {
      minHeight: "auto"
    },
    title: {
      flexGrow: 1,
      fontWeight: 900,
      color: blueGrey[400],
      cursor: "pointer"
    },
    avatar: {
        padding: theme.spacing(0)
    },
    linkConnection: {
        color: blueGrey[400],
        fontWeight: 700,
        fontSize: 10
    },
    linkInscription: {
        color: "white",
        backgroundColor: red[700],
        borderRadius: 100,
        padding: theme.spacing(1),
        fontWeight: 700,
        fontSize: 10
    }
  }
));

export function AppBarCustom({isConnect, history}: Props) {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h6" className={classes.title} onClick={()=> history.push("/")}>
                            #SportStats
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="flex-end" alignItems="center" spacing={3}>
                            {isConnect ?
                                <React.Fragment>
                                    <Grid item>
                                        <IconButton className={classes.avatar}>
                                            <Badge badgeContent={17} color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton className={classes.avatar}>
                                            <Avatar>H</Avatar>
                                        </IconButton>
                                    </Grid>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <Grid item>
                                        <Link onClick={()=> history.push("/login")} className={classes.linkConnection}>Se Connecter</Link>
                                    </Grid>
                                    <Grid item>
                                        <Link onClick={()=> history.push("/inscription")} className={classes.linkInscription}>Inscription</Link>
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Toolbar>
        </AppBar>
    )
}