import { Grid, ToggleButton, ToggleButtonGroup } from "@material-ui/core";
import { getMatchsFuturByClubId, getMatchsPasseByClubId } from "api/MatchService";
import { percent, px } from "csx";
import { Club } from "model/Club";
import { Match } from "model/Match";
import moment from "moment";
import React, { useEffect } from "react";
import { style } from "typestyle";
import { groupMatchsByMonth } from "utils/Match/matchUtils";

const table = style({
    width: percent(100)
})

const headerTable = style({
    backgroundColor: "#9e9e9e",
    color: "#FFF",
    height: px(26),
    textAlign: "left"
})

const cellHeader = style({
    paddingLeft: px(10),
    paddingTop: px(7),
    paddingBottom: px(7),
    fontWeight: 500
})

const cellBody = style({
    paddingLeft: px(10),
    fontWeight: 500
})

const moisLigne = style({
    backgroundColor: "#dadada",
    color: "#444"
})

const buttonGroupDroit = style({
    borderBottomRightRadius: px(20),
    borderTopRightRadius: px(20)
})

const buttonGroupGauche = style({
    borderBottomLeftRadius: px(20),
    borderTopLeftRadius: px(20)
})

interface Props {
    club: Club
}

export function MatchClub({club}: Props) {
    const [menu, setMenu] = React.useState<string>("futur");
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [matchsFutur, setMatchsFutur] = React.useState<Map<string, Array<Match>>>(new Map());
    const [matchsPasse, setMatchsPasse] = React.useState<Map<string, Array<Match>>>(new Map());
    
    const getMatchs = () => {
        Promise.all([getMatchsPasseByClubId(club.id), getMatchsFuturByClubId(club.id)]).then(result => {
            const matchsPasse : Array<Match> = result[0]
            const matchsFutur : Array<Match> = result[1]
            setMatchsFutur(groupMatchsByMonth(matchsFutur))
            setMatchsPasse(groupMatchsByMonth(matchsPasse))
            setIsLoading(false)     
        })
    }

    const changeMenu = (event: any, value: string) => {
        setMenu(value);
    };

    useEffect(() => {
        getMatchs()
    },[club]);

    const getTableauMatchFutur = ( matchsMonth: Map<string, Array<Match>> ) => {
        const keys = Array.from(matchsMonth.keys())
        return(
            <table className={table} cellSpacing={0}>
                <thead className={headerTable}>
                    <tr>
                        <th className={cellHeader}>Date</th>
                        <th className={cellHeader}>Heure</th>
                        <th className={cellHeader}>Lieu</th>
                        <th className={cellHeader}>Equipe</th>
                        <th className={cellHeader}>Adversaire</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.length > 0 ?
                        keys.map((mois : any) =>(
                            <React.Fragment>
                                <tr>
                                    <td colSpan={5} className={cellHeader}>{mois}</td>
                                </tr>
                                {matchsMonth.get(mois)?.map(match =>(
                                    <tr>
                                        <td className={cellBody}>{moment(match.dateMatch).format('DD/MM/YY')}</td>
                                        <td className={cellBody}>{match.heureMatch}</td>
                                        <td className={cellBody}>Lieu ???</td>
                                        <td className={cellBody}>{match.equipe.nom}</td>
                                        <td className={cellBody}>{match.adversaire}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))
                    :
                        <tr>
                            <td colSpan={5} className={cellHeader}>Aucun match à venir</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }

    const getTableauMatchPasse = ( matchsMonth: Map<string, Array<Match>> ) => {
        const keys = Array.from(matchsMonth.keys())
        return(
            <table className={table} cellSpacing={0}>
                <thead className={headerTable}>
                    <tr>
                        <th className={cellHeader}>Date</th>
                        <th className={cellHeader}>Heure</th>
                        <th className={cellHeader}>Equipe</th>
                        <th className={cellHeader}>Adversaire</th>
                        <th className={cellHeader}>Résultat</th>
                        <th className={cellHeader}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.length > 0 ?
                        keys.map((mois : any) =>(
                            <React.Fragment>
                                <tr className={moisLigne} >
                                    <td colSpan={6} className={cellHeader}>{mois}</td>
                                </tr>
                                {matchsMonth.get(mois)?.map(match =>(
                                    <tr>
                                        <td className={cellBody}>{moment(match.dateMatch).format('DD/MM/YY')}</td>
                                        <td className={cellBody}>{match.heureMatch}</td>
                                        <td className={cellBody}>{match.equipe.nom}</td>
                                        <td className={cellBody}>{match.adversaire}</td>
                                        {match.scoreEquipe !== null && match.scoreAdversaire !== null ?
                                            <React.Fragment>
                                                <td className={cellBody}>{match.scoreEquipe > match.scoreAdversaire ? "Victoire" : "Défaite"}</td>
                                                <td className={cellBody}>
                                                    <span>{match.scoreEquipe}</span>
                                                    <span> - </span>
                                                    <span>{match.scoreAdversaire}</span>
                                                </td>
                                            </React.Fragment>
                                        :
                                            <React.Fragment>
                                                <td />
                                                <td className={cellBody}>Ajouter un score</td>
                                            </React.Fragment>
                                        }
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))
                    :
                        <tr>
                            <td colSpan={6} className={cellHeader}>Aucun match à venir</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }

    return(
        <Grid container spacing={1}>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <ToggleButtonGroup value={menu} exclusive onChange={changeMenu}>
                    <ToggleButton  value="futur" className={buttonGroupGauche}>Matchs à venir</ToggleButton>
                    <ToggleButton value="passe" className={buttonGroupDroit}>Matchs joués</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                {  menu === "futur" ? 
                    getTableauMatchFutur(matchsFutur)
                : 
                    getTableauMatchPasse(matchsPasse)
                }
            </Grid>
        </Grid>
    )
}