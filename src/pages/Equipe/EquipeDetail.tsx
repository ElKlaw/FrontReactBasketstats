import { Alert, Divider, Grid } from "@material-ui/core";
import { getEquipeById } from "api/EquipeService";
import { Spinner } from "component/Spinner";
import { Equipe } from "model/Equipe";
import React from "react";

interface Props {
    match: any
    history: any
}

export function EquipeDetail({history, match} :Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [equipe, setEquipe] = React.useState<Equipe | undefined>(undefined);
    const getEquipe = (id: string) => {
        getEquipeById(id).then((result: Equipe) => {
            setEquipe(result) 
            setIsLoading(false)         
        })
    }

    React.useEffect(() => {
        getEquipe(match.params.id)
    }, [match])


    return (
        <Grid container>
            {isLoading ?
                <Spinner /> 
            :
                equipe ?
                    <React.Fragment>
                        <Grid item xs={4}>

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