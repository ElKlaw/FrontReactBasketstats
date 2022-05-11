import React from "react";
import { AppBar, Avatar, Badge, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { px } from "csx";

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
      padding: px(5),
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
        padding: px(0)
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
        padding: px(5),
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
                        <Grid container justifyContent="flex-end" alignItems="center" spacing={3}>
                            {isConnect ?
                                <React.Fragment>
                                    <Grid item>
                                        <IconButton className={classes.avatar} size="large">
                                            <Badge badgeContent={17} color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton className={classes.avatar} size="large">
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
    );
}