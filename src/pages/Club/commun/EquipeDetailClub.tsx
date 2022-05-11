import { Alert, Divider, Grid, Snackbar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getEquipeById } from "api/EquipeService";
import { getJoueursByEquipeId } from "api/JoueurService";
import { getMatchsPasseByEquipeId, getMatchsFuturByEquipeId } from "api/MatchService";
import { getPhotoById } from "api/PhotoService";
import { CardJoueur } from "component/Joueur/CardJoueur";
import { Lien } from "component/Link";
import { TableauMatchFutur, TableauMatchPasse } from "component/Match/TableMatchs";
import { Spinner } from "component/Spinner";
import { px } from "csx";
import { Equipe } from "model/Equipe";
import { Joueur } from "model/Joueur";
import { Match } from "model/Match";
import { Photo } from "model/Photo";
import React, { useCallback, useEffect, useState } from "react";
import { style } from "typestyle";
import { groupMatchsByMonth } from "utils/Match/matchUtils";

const cssPhoto = style({
    width: "100%",
    maxHeight: 200
})

const textePhotoAbsente = style({
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: px(1.25),
    fontSize: px(20)
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
    match: any
    history: any
}

export function EquipeDetailClub({history, match} :Props) {
    const idEquipe = history.location.pathname.split('/').pop()

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [equipe, setEquipe] = useState<Equipe | undefined>(undefined);
    const [photo, setPhoto] = useState<Photo | undefined>(undefined);
    
    const [menu, setMenu] = useState<string>("futur");
    const [matchsFutur, setMatchsFutur] = useState<Map<string, Array<Match>>>(new Map());
    const [matchsPasse, setMatchsPasse] = useState<Map<string, Array<Match>>>(new Map());
    
    const [joueurs, setJoueurs] = useState<Array<Joueur>>([]);

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [erreurSnackbar, setErreurSnackbar] = useState<string>("");

    const getJoueurs = useCallback(() => {
        getJoueursByEquipeId(idEquipe).then(res => {
            setJoueurs(res)
        })
    }, [idEquipe])

    useEffect(() => {
        getJoueurs()
    },[getJoueurs]);

    const getPhotos = () => { 
        const photoEquipe = equipe ? equipe.photo : undefined
        if(photoEquipe) {
            getPhotoById(photoEquipe).then((photo: Photo) => {
                setPhoto(photo)
            })
        }
    }

    const getEquipe = (id: string) => {
        getEquipeById(id).then((result: Equipe) => {
            setEquipe(result) 
            setIsLoading(false)         
        })
    }

    const getMatchs = () => {
        if(equipe) {
            Promise.all([getMatchsPasseByEquipeId(equipe.id), getMatchsFuturByEquipeId(equipe.id)]).then(result => {
                const matchsPasse : Array<Match> = result[0]
                const matchsFutur : Array<Match> = result[1]
                setMatchsFutur(groupMatchsByMonth(matchsFutur))
                setMatchsPasse(groupMatchsByMonth(matchsPasse)) 
            })
        }
    }

    useEffect(() => {
        getEquipe(idEquipe)
    }, [history])

    useEffect(() => {
        getPhotos()
        getMatchs()
    },[equipe]);

    const changeMenuCalendrier = (event: any, value: string) => {
        setMenu(value);
    };


    return (
        <Grid container spacing={1} style={{marginTop : 30}}>
            {isLoading ?
                <Grid item xs={12}>
                    <Spinner />
                </Grid>
            :
                equipe ?
                    <>
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
                          <Lien 
                            history={history}
                            label="< Retour"
                          />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <h1>{equipe.nom}</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <span>{equipe.categorie} {equipe.sexe}</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span>{equipe.niveau} {equipe.division} (Poule {equipe.poule})</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span>Coach : </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span>Entraineur :</span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            {photo ?
                                <img alt="" src={`data:${photo.extension};base64,${photo.data}`} className={cssPhoto} />
                            :
                                <div className={cssPhoto}>
                                <span className={textePhotoAbsente}>Photo</span>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <h3>Effectif de l'équipe</h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {joueurs.map((joueur : Joueur) => (
                                    <Grid item xs={2} key={joueur.id}>
                                        <CardJoueur 
                                            joueur={joueur} 
                                            goTo={(value) => console.log(value)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Calendrier des matchs</h3>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <ToggleButtonGroup value={menu} exclusive onChange={changeMenuCalendrier}>
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
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </>
                :
                    <Grid item xs={12}>
                        <Alert severity="error">Oups une erreur est survenue. Veuillez réssayer</Alert>
                    </Grid>
            }
        </Grid>
    )
}