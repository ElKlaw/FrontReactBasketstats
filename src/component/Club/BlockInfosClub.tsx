import { Grid, Paper } from "@material-ui/core";
import { Club } from "model/Club";
import { Ville } from "model/Ville";
import React from "react";
import { style } from "typestyle";

const titreInfos = style({
    fontWeight: 500
})

interface Props{
    club: Club
}

export function BlockInfosClub({club}: Props){

    return(
        <Paper elevation={3} style={{padding: 10}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h1>{club.nomcomplet}</h1>
                </Grid>
                <Grid item xs={12}>
                    <span className={titreInfos}>Sport : </span>
                    <span>{club.sport.nom}</span>
                </Grid>
                <Grid item xs={12}>
                    <span className={titreInfos}>Région : </span>
                    <span>{club.villes[0].region}</span>
                </Grid>
                <Grid item xs={12}>
                    <span className={titreInfos}>Département : </span>
                    <span>{club.villes[0].departement} ({club.villes[0].codeDepartement})</span>
                </Grid>
                <Grid item xs={12}>
                    <span className={titreInfos}>Ville : </span>
                    {club.villes.map((ville: Ville, index: number) => (
                        <span>{ville.nom} ({ville.codePostal}) {club.villes.length > index+1 ? ', ' : ''}</span>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    )
}