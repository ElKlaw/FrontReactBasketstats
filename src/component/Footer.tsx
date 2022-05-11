import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

import CopyrightIcon from '@mui/icons-material/Copyright';

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { style } from "typestyle";

const iconReseau = style({
    verticalAlign: "middle",
    marginRight : 10
})
export function Footer () {
    return(
        <Grid container>
            <Grid item xs={12}>
                <Paper style={{backgroundColor: "black", textAlign: "center", color: "white", padding: 15}}>
                    <Typography variant="h6">
                        Suivez-nous
                    </Typography>
                    <Grid container justifyContent="center" spacing={3} alignContent="center">
                        <Grid item>
                            <YouTubeIcon fontSize="large" className={iconReseau}/> 
                            <span>Youtube</span>
                        </Grid>
                        <Grid item>
                            <TwitterIcon fontSize="large" className={iconReseau}/> 
                            <span>Twitter</span>
                        </Grid>
                        <Grid item>
                            <InstagramIcon fontSize="large" className={iconReseau}/> 
                            <span>Instagram</span>
                        </Grid>
                    </Grid>
                    <p>Copyright 2020 <CopyrightIcon fontSize="small" style={{verticalAlign: "bottom"}}/> - SportStats SAS</p>
                </Paper>
            </Grid>
        </Grid>
    )
}