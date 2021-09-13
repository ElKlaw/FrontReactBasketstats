import { Alert, Divider, Grid } from "@material-ui/core";
import { getEquipeById } from "api/EquipeService";
import { getPhotoById } from "api/PhotoService";
import { Lien } from "component/Link";
import { Spinner } from "component/Spinner";
import { percent, px } from "csx";
import { Equipe } from "model/Equipe";
import { Photo } from "model/Photo";
import React from "react";
import { style } from "typestyle";

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

const blockPhoto = style({
    width: percent(100),
    height: px(80),
    borderRadius: px(5),
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "#A5A5A5",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

interface Props {
    match: any
    history: any
}

export function EquipeDetailClub({history, match} :Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [equipe, setEquipe] = React.useState<Equipe | undefined>(undefined);
    const [photo, setPhoto] = React.useState<Photo | undefined>(undefined);

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

    React.useEffect(() => {
        getEquipe(match.params.id)
    }, [match])

    React.useEffect(() => {
        getPhotos()
      },[equipe]);


    return (
        <Grid container>
            {isLoading ?
                <Spinner /> 
            :
                equipe ?
                    <React.Fragment>
                        <Grid item xs={12}>
                          <Lien 
                            history={history}
                            label="< Retour"
                          />
                        </Grid>
                        <Grid item xs={4}>
                            {photo ?
                                <img src={`data:${photo.extension};base64,${photo.data}`} className={cssPhoto} />
                            :
                                <div className={cssPhoto}>
                                <span className={textePhotoAbsente}>Photo</span>
                                </div>
                            }
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
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <h1>Effectif de l'équipe</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <h1>Calendrier des matchs</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                :
                    <Grid item xs={12}>
                        <Alert severity="error">Oups une erreur est survenue. Veuillez réssayer</Alert>
                    </Grid>
            }
        </Grid>
    )
}