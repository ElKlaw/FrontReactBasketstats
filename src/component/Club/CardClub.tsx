import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import { percent, px, rem } from "csx";
import React, { useEffect } from "react";
import { Club } from "../../model/Club";
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import RoomIcon from '@material-ui/icons/Room';
import { ButtonBase } from "../Button";
import { makeStyles } from "@material-ui/styles";
import { getPhotoById } from "api/PhotoService";
import { Photo } from "model/Photo";

const useStyles = makeStyles({
    media: {
      height: 200,
    },
    divLogo: {
        width: rem(5),
        height: rem(5),
        borderRadius: percent(50),
        position: "absolute",
        overflow: "hidden",
        top: 0,
        transform: "translateY(-60%)"
    },
    logo: {
        width: percent(100),
        height: percent(100)
    },
    nomComplet: {
        fontWeight: 700,
        color: grey[700],
        fontSize: px(18),
        marginBottom: 5
    },
    sport: {
        marginBottom: 5
    },
    region: {
        marginBottom: 5,
        color: grey[500]
    },
    ville: {
        marginBottom: 5,
        color: grey[500]
    },
    icon: {
        verticalAlign: "middle",
        marginRight: 10
    },
    textInfos: {
        verticalAlign: "middle"
    }
});



interface PropsCardClub{
    club: Club
    history: any
}
export function CardClub ({club, history} : PropsCardClub) {
    const classes = useStyles();
    const [photoFont, setPhotoFont] = React.useState<Photo | undefined>(undefined);
    const [logo, setLogo] = React.useState<Photo | undefined>(undefined);
    
    const getPhotos = () => {
        getImageFond();
        getImageLogo();
    }

    const getImageFond = () => {
        const font = club.fond
        if(font){
            getPhotoById(font).then((photo: Photo) => {
                setPhotoFont(photo)
            })
        }
    }
    
    const getImageLogo = () =>{
        const logo = club.logo
        if(logo) {
            getPhotoById(logo).then((photo: Photo) => {
                setLogo(photo)
            })
        }
    }
    
    useEffect(() => {
        getPhotos()
    },[club]);

    return (
        <Card>
            {photoFont ?
                <CardMedia
                    component='img'
                    className={classes.media}
                    src={`data:${photoFont.extension};base64,${photoFont.data}`}
                    title="photo club"
                />
            : 
                <Skeleton variant="rectangular" width="100%" height={200} />
            }
            <CardContent style={{position: "relative"}}>
                <div className={classes.divLogo}>
                    {logo ?
                        <img className={classes.logo} src={`data:${logo.extension};base64,${logo.data}`} />
                    :
                        <Skeleton variant="circular" width="100%" height="100%"/>
                    }                
                </div>
                <p className={classes.nomComplet}>{club.nomcomplet}</p>
                <div className={classes.sport}>
                    <SportsBasketballIcon className={classes.icon}/>
                    <span className={classes.textInfos}>{club.sport.nom}</span>
                </div>
                <div className={classes.region}>
                    <RoomIcon className={classes.icon} /> 
                    <span className={classes.textInfos}>{club.villes[0].region}</span>
                </div>
                <div className={classes.ville}>
                    <RoomIcon className={classes.icon} /> 
                    <span className={classes.textInfos}>{club.villes[0].codeDepartement} - {club.villes[0].departement}</span>
                </div>
            </CardContent>
            <CardActions>
                <ButtonBase
                    fullWidth
                    onClick={()=> history.push(`/club/${club.url}/accueil`)}
                >
                    Voir plus
                </ButtonBase>
            </CardActions>
        </Card>
    )
}