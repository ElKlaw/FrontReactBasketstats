import { Grid } from "@material-ui/core";
import React from "react";

interface Props {}

interface States {
}
// css

export class ClubHome extends React.Component<Props, States> {
    render() {
        return(
            <Grid container>
                <Grid item xs={12}>
                    HOME CLUB
                </Grid>
            </Grid>
        )
    }
}