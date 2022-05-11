import { Grid } from "@mui/material";
import { px } from "csx";
import { Match } from "model/Match";
import moment from "moment";
import React from "react";
import { Colors } from "style/colors";
import { mediumTexte, smallTexte, texteGras } from "style/text";
import { classes, style } from "typestyle";
import { isDomicileVictoire, isScoreSaisie } from "utils/Match/matchUtils";

const textEquipeGauche = style({
    textAlign: "right"
})

const textEquipeDroite = style({
    textAlign: "left"
})

const textInfosMatch = style({
    textAlign: "center"
})

const textDate = style({
    margin: px(0),
    fontWeight: 800
})

const textHeure = style({
    margin: px(0)
})

const textVictoire = style({
    color: Colors.victoire,
    fontWeight: 700
})

const textDefaite = style({
    color: Colors.defaite,
    fontWeight: 700
})

interface Props {
    match: Match
}
export function BlockFuturMatchTab({match} : Props) {
    return(
        <Grid container>
            <Grid item xs={5} className={textEquipeGauche}>
                <span className={mediumTexte}>{match.domicile ? match.equipe.nom : match.adversaire}</span>
            </Grid>
            <Grid item xs={2} className={textInfosMatch}>
                <p className={classes(mediumTexte, textDate)}>{moment(match.dateMatch).format('DD/MM')}</p>
                <p className={classes(smallTexte, textHeure)}>{match.heureMatch}</p>
            </Grid>
            <Grid item xs={5} className={textEquipeDroite}>
                <span className={mediumTexte}>{match.domicile ? match.adversaire : match.equipe.nom}</span>
            </Grid>
        </Grid>
    )
}



export function BlockMatchPasseTab({match} : Props) {
    const isDomicile = match.domicile
    const victoireDomicile = isDomicileVictoire(match)
    const scoreSaisie = isScoreSaisie(match)
    return(
        <Grid container spacing={1}>
            <Grid item xs={4} className={textEquipeGauche}>
                <span 
                    className={
                        scoreSaisie && isDomicile ? 
                            victoireDomicile ? classes(mediumTexte, textVictoire) : classes(mediumTexte, textDefaite) 
                        : 
                            mediumTexte
                    }
                >
                    {match.domicile ? match.equipe.nom : match.adversaire}
                </span>
            </Grid>
            <Grid item xs={4} className={textInfosMatch}>
                <span className={scoreSaisie && victoireDomicile ? classes(mediumTexte, texteGras) : mediumTexte}>{match.domicile ? match.scoreEquipe : match.scoreAdversaire }</span>
                <span className={mediumTexte}> - </span>
                <span className={scoreSaisie && victoireDomicile ? mediumTexte : classes(mediumTexte, texteGras)}> {match.domicile ? match.scoreAdversaire : match.scoreEquipe }</span>
            </Grid>
            <Grid item xs={4} className={textEquipeDroite}>
                <span 
                    className={
                        scoreSaisie && !isDomicile ? 
                            victoireDomicile ? classes(mediumTexte, textDefaite) : classes(mediumTexte, textVictoire)
                        : 
                            mediumTexte
                    }
                >
                    {match.domicile ? match.adversaire : match.equipe.nom}
                </span>
            </Grid>
        </Grid>
    )
}