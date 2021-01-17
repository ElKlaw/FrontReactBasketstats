import { Card, CardActions, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import { percent, px, rem } from "csx";
import React from "react";
import { Club } from "../model/Club";
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import RoomIcon from '@material-ui/icons/Room';
import { ButtonBase } from "./Button";

const useStylesCardClub = makeStyles({
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
    }
});



interface PropsCardClub{
    club: Club
    voirPlus: () => void
}
export function CardClub ({club, voirPlus} : PropsCardClub) {
    const classes = useStylesCardClub();
    return (
        <Card>
            {club.imagefont ?
                <CardMedia
                    component='img'
                    className={classes.media}
                    image={URL.createObjectURL(club.imagefont)}
                    title="photo club"
                />
            : 
                <Skeleton variant="rect" width="100%" height={200} />
            }
            <CardContent style={{position: "relative"}}>
                <div className={classes.divLogo}>
                    {club.imagelogo ?
                        <img className={classes.logo} src={URL.createObjectURL(club.imagelogo)} alt="logo club"/>
                    :
                        <Skeleton variant="circle" width="100%" height="100%"/>
                    }                
                </div>
                <p className={classes.nomComplet}>{club.nomcomplet}</p>
                <div className={classes.sport}>
                    <SportsBasketballIcon className={classes.icon}/>
                    <span>{club.sport}</span>
                </div>
                <div className={classes.region}>
                    <RoomIcon className={classes.icon} /> 
                    <span>{club.villes[0].region}</span>
                </div>
                <div className={classes.ville}>
                    <RoomIcon className={classes.icon} /> 
                    <span>{club.villes[0].codeDepartement} - {club.villes[0].departement}</span>
                </div>
            </CardContent>
            <CardActions>
                <ButtonBase
                    fullWidth
                    onClick={()=> voirPlus()}
                >
                    Voir plus
                </ButtonBase>
            </CardActions>
        </Card>
    )
}