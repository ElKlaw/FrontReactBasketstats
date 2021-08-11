import { Card, CardActions, CardContent, CardMedia, Skeleton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getPhotoById } from "api/PhotoService";
import { ButtonBase } from "component/Button";
import { Equipe } from "model/Equipe";
import React, { useEffect } from "react";
import { largeTexte, mediumTexte } from "style/text";

const useStyles = makeStyles({
    media: {
      height: 200,
    },
});

interface Props {
    equipe: Equipe
    history: any
}

export function CardEquipe({equipe, history} : Props) {
    const classes = useStyles();
    const [photo, setPhoto] = React.useState<string | undefined>(undefined);

    const getPhotos = () => { 
        const photo = equipe.photo
        if(photo) {
            getPhotoById(photo).then((photo: string) => {
                setPhoto(photo)
            })
        }
    }

    useEffect(() => {
        getPhotos()
    },[equipe]);

    return (
        <Card>
            {photo ?
                <CardMedia
                    component='img'
                    className={classes.media}
                    image={photo}
                    title="photo club"
                />
            : 
                <Skeleton variant="rectangular" width="100%" height={200} />
            }
            <CardContent style={{position: "relative"}}>
                <p className={largeTexte}>{equipe.nom}</p>
                <p className={mediumTexte}>{equipe.categorie} {equipe.sexe}</p>
                <p className={mediumTexte}>{equipe.niveau} {equipe.division} - Poule {equipe.poule}</p>
            </CardContent>
            <CardActions>
                <ButtonBase
                    fullWidth
                    onClick={()=> history.push(`/equipe/${equipe.id}`)}
                >
                    Voir plus
                </ButtonBase>
            </CardActions>
        </Card>
    )
}