import { Alert, Grid, Snackbar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getMatchsFuturByClubId, getMatchsPasseByClubId } from "api/MatchService";
import { ButtonBase } from "component/Button";
import CustomizedDialogs from "component/Dialog";
import { px } from "csx";
import { Club } from "model/Club";
import { Match } from "model/Match";
import { FormulaireMatch } from "pages/Formulaire/FormulaireMatch";
import React, { useCallback, useEffect } from "react";
import { style } from "typestyle";
import { groupMatchsByMonth } from "utils/Match/matchUtils";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TableauMatchFutur, TableauMatchPasse } from "component/Match/TableMatchs";

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
    resfresh: () => void
}



export function MatchClub({club}: Props) {
    const [isOpenModalCreation, setIsOpenModalCreation] = React.useState<boolean>(false);
    const [menu, setMenu] = React.useState<string>("futur");
    const [matchsFutur, setMatchsFutur] = React.useState<Map<string, Array<Match>>>(new Map());
    const [matchsPasse, setMatchsPasse] = React.useState<Map<string, Array<Match>>>(new Map());
    
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [erreurSnackbar, setErreurSnackbar] = React.useState<string>("");
    
    const getMatchs = useCallback(() => {
        Promise.all([getMatchsPasseByClubId(club.id), getMatchsFuturByClubId(club.id)]).then(result => {
            const matchsPasse : Array<Match> = result[0]
            const matchsFutur : Array<Match> = result[1]
            setMatchsFutur(groupMatchsByMonth(matchsFutur))
            setMatchsPasse(groupMatchsByMonth(matchsPasse))
        })
    }, [club])

    const changeMenu = (event: any, value: string) => {
        setMenu(value);
    };

    useEffect(() => {
        getMatchs()
    },[getMatchs]);

    return(
        <Grid container spacing={1}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{vertical :'bottom', horizontal: 'center'}}>
                {erreurSnackbar !== "" ?
                    <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                        {erreurSnackbar}
                    </Alert>
                :
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        Votre modification a été pris en compte.
                    </Alert>
                }
            </Snackbar>
            <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={4}>
                        <ButtonBase
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={()=> setIsOpenModalCreation(true)}
                        >
                            Créer un match
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <ToggleButtonGroup value={menu} exclusive onChange={changeMenu}>
                    <ToggleButton  value="futur" className={buttonGroupGauche}>Matchs à venir</ToggleButton>
                    <ToggleButton value="passe" className={buttonGroupDroit}>Matchs joués</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                {  menu === "futur" ? 
                    <TableauMatchFutur 
                        matchs={matchsFutur} 
                        validate={(value : boolean) => {
                            setOpenSnackbar(true)
                            setErreurSnackbar(value ? "" : "Oups une erreur est survenue. Veuillez réessayer plus tard.")
                            getMatchs()
                        }}
                    />
                : 
                    <TableauMatchPasse 
                        matchs={matchsPasse} 
                        validate={(value : boolean) => {
                            setOpenSnackbar(true)
                            setErreurSnackbar(value ? "" : "Oups une erreur est survenue. Veuillez réessayer plus tard.")
                            getMatchs()
                        }}
                    />
                }
            </Grid>
            <CustomizedDialogs 
                handleClose={()=> setIsOpenModalCreation(false)} 
                isOpen={isOpenModalCreation}
                title={
                    <span>Créer un match</span>
                }
                content={
                    <FormulaireMatch 
                        onClose={()=> {
                            setIsOpenModalCreation(false)
                        }}
                        validate={res => {
                            setOpenSnackbar(true)
                            setErreurSnackbar(res ? "" : "Oups une erreur est survenue. Veuillez réessayer plus tard.")
                            getMatchs()
                        }}
                        club={club}
                    />
                }
            />

        </Grid>
    )
}