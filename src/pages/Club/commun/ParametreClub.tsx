import { Grid } from "@material-ui/core";
import { Club } from "model/Club";

interface Props {
    club: Club
}

export function ParametreClub({club}: Props) {
    return(
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <span>Parametre</span>
            </Grid>
        </Grid>
    )
}