import { Grid } from "@mui/material";
import { getJoueursByClubId } from "api/JoueurService";
import { ButtonBase } from "component/Button";
import { Club } from "model/Club";
import { Joueur } from "model/Joueur";
import { useCallback, useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CardJoueur } from "component/Joueur/CardJoueur";
import CustomizedDialogs from "component/Dialog";
import { FormulaireJoueur } from "pages/Formulaire/FormulaireJoueur";

interface Props {
    club: Club
    resfresh: () => void
}

export function JoueurClub({club}: Props) {
    const [joueurs, setJoueurs] = useState<Array<Joueur>>([]);

    const [isOpenModalCreation, setIsOpenModalCreation ] = useState<boolean>(false);

    const getJoueurs = useCallback(() => {
        getJoueursByClubId(club.id).then(res => {
            setJoueurs(res)
        })
    }, [club])

    useEffect(() => {
        getJoueurs()
    },[getJoueurs]);
    
    return(
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={4}>
                        <ButtonBase
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={()=> setIsOpenModalCreation(true)}
                        >
                            Ajouter un joueur
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
            {joueurs.map((joueur : Joueur) => (
                <Grid item xs={2} key={joueur.id}>
                    <CardJoueur 
                        joueur={joueur} 
                        goTo={(value) => console.log(value)}
                    />
                </Grid>
            ))}
            <CustomizedDialogs 
                handleClose={()=> setIsOpenModalCreation(false)} 
                isOpen={isOpenModalCreation}
                title={
                    <span>Ajouter un joueur</span>
                }
                content={
                    <FormulaireJoueur 
                        onClose={()=> {
                            setIsOpenModalCreation(false)
                            getJoueurs()
                        }}
                        club={club}
                    />
                }
            />
        </Grid>
    )
}