import { Grid } from "@mui/material";
import React from "react";

interface Props {}

interface States {}

export class Home extends React.Component<Props, States> {

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <p>Home</p>
                </Grid>
            </Grid>
            
        )
    }
}