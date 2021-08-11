import { Grid } from "@material-ui/core";
import { getEquipesByClubId } from "api/EquipeService";
import { CardEquipe } from "component/Equipe/CardEquipe";
import { Club } from "model/Club";
import { Equipe } from "model/Equipe";
import React, { useEffect } from "react";

interface Props {
    club: Club
    history: any
}

export function EquipeClub({club, history}: Props) {
    const [equipes, setEquipes] = React.useState<Array<Equipe>>([]);
    
    const getEquipes = () => {
        getEquipesByClubId(club.id).then((equipes : Array<Equipe>) => {
            setEquipes(equipes)
        })
    }

    useEffect(() => {
        getEquipes()
    },[club]);

    return(
        <Grid container spacing={1}>
            {equipes.map((equipe : Equipe) => (
                <Grid item xs={3}>
                    <CardEquipe equipe={equipe} history={history} />
                </Grid>
            ))}
        </Grid>
    )
}