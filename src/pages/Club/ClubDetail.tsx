import { Alert, Grid, Skeleton } from "@mui/material";
import { getPhotoById } from "api/PhotoService";
import { Spinner } from "component/Spinner";
import { TabBase, TabsBase } from "component/Tabs";
import { percent, px } from "csx";
import { Photo } from "model/Photo";
import React from "react";
import { Route } from "react-router-dom";
import { subRoutesClub } from "routing/club";
import { style } from "typestyle";
import { getClubByURL } from "../../api/ClubService";
import { Club } from "../../model/Club";

const classImageFond = style({
    width: percent(100)
})

const classImageLogo = style({
    width: percent(100),
    height: percent(100)
})

const classDivImageLogo = style({
    width: px(150),
    height: px(150),
    marginLeft: percent(3),
    backgroundColor: "white",
    borderRadius: percent(50),
    position: "absolute",
    overflow: "hidden",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)",
    transform: "translateY(-50%)"
})


interface Props {
    match: any
    history: any
}

interface States {
    club: Club| null
    isLoading: boolean
    imagefont?: Photo
    imageLogo?: Photo
    isLoadingImage: boolean
    menu: string
}

export class ClubDetail extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props)
        this.state= {
            club: null,
            isLoading: true,
            imagefont: undefined,
            imageLogo: undefined,
            isLoadingImage: true,
            menu: props.history.location.pathname.split('/')[3]
        }
    }

    componentDidMount() {
        this.getClub()
    }

    public getClub = () => {
        const id = this.props.match.params.id
        getClubByURL(id).then((result: Club) => {
            this.setState({
                club: result,
                isLoading: false
            }, () => {
                this.loadImage(result)
            })            
        })
    }

    public loadImage = (clubParam: Club) => {
        const fond = clubParam.fond
        const logo = clubParam.logo
        if( fond && logo) {
            Promise.all([getPhotoById(fond), getPhotoById(logo) ]).then((res: any) =>{
                this.setState({
                    imagefont: res[0],
                    imageLogo: res[1],
                    isLoadingImage: false
                })
            })
        } else {
            this.setState({isLoadingImage: false})
        }
    }

    public changeMenu = (event: React.ChangeEvent<{}>, newValue: string) => {
        const idClub = this.props.match.params.id
        this.setState({
            menu: newValue
        }, () => this.props.history.push(`/club/${idClub}/${newValue}`))
    }

    render() {
        const {isLoading, isLoadingImage, imagefont, imageLogo, club, menu} = this.state
        const {history, match} = this.props
        return(
            <Grid container>
                {isLoading ?
                    <Spinner /> 
                :
                    club !== null ?
                        <React.Fragment>
                            {club.fond &&
                                <Grid item xs={12} style={{maxHeight: 700, overflow: "hidden"}}>
                                    {isLoadingImage || imagefont === undefined ?
                                        <Skeleton variant="rectangular" width="100%" height={300} />
                                    :
                                        <img alt="" src={`data:${imagefont.extension};base64,${imagefont.data}`} className={classImageFond}/>
                                    }
                                </Grid>
                            }
                            
                            
                            <Grid item xs={12} style={{boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)"}}>
                                {club.logo && 
                                    <div className={classDivImageLogo}>
                                        {isLoadingImage || imageLogo === undefined ?
                                            <Skeleton variant="circular" width="100%" height="100%" />
                                        :
                                            <img alt="" src={`data:${imageLogo.extension};base64,${imageLogo.data}`} className={classImageLogo}/>
                                        }
                                    </div>
                                    
                                }
                                <TabsBase
                                    value={menu}
                                    onChange={this.changeMenu}
                                    centered
                                >
                                    <TabBase label="Accueil" value="accueil"/>
                                    <TabBase label="Équipe" value="equipe"/>
                                    <TabBase label="Joueurs" value="joueur"/>
                                    <TabBase label="Matchs" value="match"/>
                                    <TabBase label="Paramètres" value="parametre"/>
                                </TabsBase>
                            </Grid>
                            
                            <Grid item xs={12} >
                                <div style={{margin: 20, flexGrow: 1}}>
                                    {subRoutesClub.map((route, i) => (
                                        <Route
                                            key={route.url}
                                            path={route.url}
                                            exact={route.exact}
                                            render={props =>
                                                <route.component 
                                                    club={club} 
                                                    refresh={() => this.getClub()}
                                                    history={history}
                                                    match={match}
                                                />
                                            }
                                        />
                                    ))}
                                </div>
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
}