import { Grid } from "@material-ui/core";
import { px } from "csx";
import { Match } from "model/Match";
import moment from "moment";
import React from "react";
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
    const victoireDomicile = isDomicileVictoire(match)
    const scoreSaisie = isScoreSaisie(match)
    return(
        <Grid container spacing={1}>
            <Grid item xs={5} className={textEquipeGauche}>
                <span className={scoreSaisie && victoireDomicile ? classes(mediumTexte, texteGras) : mediumTexte}>{match.domicile ? match.equipe.nom : match.adversaire}</span>
            </Grid>
            <Grid item xs={2} className={textInfosMatch}>
                <span className={mediumTexte}>{match.domicile ? match.scoreEquipe : match.scoreAdversaire } - {match.domicile ? match.scoreAdversaire : match.scoreEquipe }</span>
            </Grid>
            <Grid item xs={5} className={textEquipeDroite}>
                <span className={scoreSaisie && !victoireDomicile ? classes(mediumTexte, texteGras) : mediumTexte}>{match.domicile ? match.adversaire : match.equipe.nom}</span>
            </Grid>
        </Grid>
    )
}