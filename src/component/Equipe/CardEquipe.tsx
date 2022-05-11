import { Card, CardActions, CardContent, CardMedia, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getPhotoById } from "api/PhotoService";
import { ButtonBase } from "component/Button";
import { Equipe } from "model/Equipe";
import { Photo } from "model/Photo";
import React, { useEffect } from "react";
import { largeTexte, mediumTexte } from "style/text";

const useStyles = makeStyles({
    media: {
      height: 200,
    },
});

interface Props {
    equipe: Equipe
    goTo: (equipe: Equipe) => void
}

export function CardEquipe({equipe, goTo} : Props) {
    const classes = useStyles();
    const [photo, setPhoto] = React.useState<Photo | undefined>(undefined);

    const getPhotos = () => { 
        const photoEquipe = equipe.photo
        if(photoEquipe) {
            getPhotoById(photoEquipe).then((photo: Photo) => {
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
                    src={`data:${photo.extension};base64,${photo.data}`}
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
                    onClick={()=> goTo(equipe)}
                >
                    Voir plus
                </ButtonBase>
            </CardActions>
        </Card>
    )
}