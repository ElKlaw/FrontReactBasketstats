import { Grid, Paper } from "@mui/material";
import { getMatchsFuturByClubId, getMatchsPasseByClubId } from "api/MatchService";
import { BlockInfosClub } from "component/Club/BlockInfosClub";
import { BlockMatchs } from "component/Match/BlockMatchs";
import { Club } from "model/Club";
import { Match } from "model/Match";
import React, { useEffect } from "react";


interface Props {
    club: Club
    resfresh: () => void
}

export function AccueilClub({club} :Props) {
    const [matchsFutur, setMatchsFutur] = React.useState<Array<Match>>([]);
    const [matchsPasse, setMatchsPasse] = React.useState<Array<Match>>([]);
    
    const getMatchs = () => {
        Promise.all([getMatchsPasseByClubId(club.id), getMatchsFuturByClubId(club.id)]).then(result => {
            const matchsPasse : Array<Match> = result[0]
            const matchsFutur : Array<Match> = result[1]
            setMatchsFutur(matchsFutur)
            setMatchsPasse(matchsPasse) 
        })
    }

    useEffect(() => {
        getMatchs()
    },[club]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <BlockInfosClub club={club}/>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={{padding: 10}}>
                    <Grid container >
                        <Grid item xs={12}>
                            <h1>Accueil</h1>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <BlockMatchs matchsFutur={matchsFutur} matchsPasse={matchsPasse} />
            </Grid>
        </Grid>
    )
}