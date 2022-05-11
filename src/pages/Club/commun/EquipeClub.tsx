import { Grid } from "@mui/material";
import { getEquipesByClubId } from "api/EquipeService";
import { ButtonBase } from "component/Button";
import { CardEquipe } from "component/Equipe/CardEquipe";
import { Club } from "model/Club";
import { Equipe } from "model/Equipe";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useEffect } from "react";
import { FormulaireEquipe } from "pages/Formulaire/FormulaireEquipe";
import CustomizedDialogs from "component/Dialog";

interface Props {
    club: Club
    history: any
    resfresh: () => void
}

export function EquipeClub({club, history}: Props) {
    const [equipes, setEquipes] = React.useState<Array<Equipe>>([]);
    const [isOpenModalCreation, setIsOpenModalCreation ] = React.useState<boolean>(false);
    const getEquipes = () => {
        getEquipesByClubId(club.id).then((equipes : Array<Equipe>) => {
            setEquipes(equipes)
        })
    }

    useEffect(() => {
        getEquipes()
    },[club]);

    const voirDetailEquipe = (equipe: Equipe) => {
        history.push(`/club/${club.url}/equipe/${equipe.id}`)
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={4}>
                        <ButtonBase
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={()=> setIsOpenModalCreation(true)}
                        >
                            Créer une équipe
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
            {equipes.map((equipe : Equipe) => (
                <Grid item xs={3} key={equipe.id}>
                    <CardEquipe 
                        equipe={equipe} 
                        goTo={voirDetailEquipe}
                    />
                </Grid>
            ))}
            <CustomizedDialogs 
                handleClose={()=> setIsOpenModalCreation(false)} 
                isOpen={isOpenModalCreation}
                title={
                    <span>Créer une équipe</span>
                }
                content={
                    <FormulaireEquipe 
                        onClose={()=> {
                            setIsOpenModalCreation(false)
                            getEquipes()
                        }}
                        club={club}
                    />
                }
            />
        </Grid>
    )
}