import { Card, CardActions, CardContent, CardMedia, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getPhotoById } from "api/PhotoService";
import { ButtonBase } from "component/Button";
import { Joueur } from "model/Joueur";
import { Photo } from "model/Photo";
import React, { useEffect, useState } from "react";
import { largeTexte } from "style/text";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { grey } from "@mui/material/colors";

const useStyles = makeStyles({
    media: {
      height: 200,
    },
    divNoPhoto: {
        height: 200,
        backgroundColor: grey[300],
        display: "flex"
    },
    imgNoPhoto: {
        margin: "auto",
        width: 80,
        height: 80,
        fill: "white"
    }
});

interface Props {
    joueur: Joueur
    goTo: (joueur: Joueur) => void
}

export function CardJoueur({joueur, goTo} : Props) {
    const classes = useStyles();
    const [loadingPhoto, setLoadingPhoto] = useState<boolean>(true);
    const [photo, setPhoto] = useState<Photo | undefined>(undefined);

    const getPhotos = () => { 
        const photoJoueur = joueur.photo
        if(photoJoueur !== null) {
            getPhotoById(photoJoueur).then((photo: Photo) => {
                setPhoto(photo)
                setLoadingPhoto(false)
            })
        }
        setLoadingPhoto(false)
    }

    useEffect(() => {
        getPhotos()
    },[joueur]);

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
              loadingPhoto ?
                <Skeleton variant="rectangular" width="100%" height={200} />
              :
                <div className={classes.divNoPhoto}>
                  <NoPhotographyIcon className={classes.imgNoPhoto} />
                </div>
            }
            <CardContent style={{position: "relative"}}>
                <p className={largeTexte}>{joueur.prenom} {joueur.nom}</p>
            </CardContent>
            <CardActions>
                <ButtonBase
                    fullWidth
                    onClick={()=> goTo(joueur)}
                >
                    Voir plus
                </ButtonBase>
            </CardActions>
        </Card>
    )
}