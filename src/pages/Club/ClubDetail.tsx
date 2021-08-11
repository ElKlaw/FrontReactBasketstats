import { Grid, Paper, Skeleton } from "@material-ui/core";
import { getMatchsFuturByClubId, getMatchsPasseByClubId } from "api/MatchService";
import { getPhotoById } from "api/PhotoService";
import { BlockInfosClub } from "component/Club/BlockInfosClub";
import { BlockMatchs } from "component/Match/BlockMatchs";
import { Spinner } from "component/Spinner";
import { TabBase, TabsBase } from "component/Tabs";
import { percent, px } from "csx";
import { Match } from "model/Match";
import React from "react";
import { style } from "typestyle";
import { getClubByURL } from "../../api/ClubService";
import { Club } from "../../model/Club";
import { AccueilClub } from "./commun/AccueilClub";
import { EquipeClub } from "./commun/EquipeClub";
import { JoueurClub } from "./commun/JoueurClub";
import { MatchClub } from "./commun/MatchClub";
import { ParametreClub } from "./commun/ParametreClub";

const classImageFond = style({
    width: percent(100)
})

const classImageLogo = style({
    width: px(100),
    height: px(100)
})

interface Props {
    match: any
    history: any
}

interface States {
    club: Club| null
    isLoading: boolean
    imagefont: any
    imageLogo: any
    isLoadingImage: boolean
    menu: number
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
            menu: 0
        }
    }

    componentDidMount() {
        this.getClub(this.props.match.params.id)
    }

    

    public getClub = (id: string) => {
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
        }
    }

    public changeMenu = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            menu: newValue
        })
    }

    public getBody = (index: number, club: Club) => {
        let body = <AccueilClub club={club} />
        switch(index) {
            case 0:
                body = <AccueilClub club={club} />
                break;
            case 1:
                body = <EquipeClub club={club} history={this.props.history} />
                break;
            case 2:
                body = <JoueurClub club={club} />
                break;
            case 3:
                body = <MatchClub club={club} />
                break;
            case 4:
                body = <ParametreClub club={club} />
                break;
        }
        return body
    }

    render() {
        const {isLoading, isLoadingImage, imagefont, imageLogo, club, menu} = this.state
        return(
            <Grid container>
                {isLoading ?
                    <Spinner /> 
                :
                    <React.Fragment>
                        <Grid item xs={12} style={{maxHeight: 700, overflow: "hidden"}}>
                            {isLoadingImage ?
                                <Skeleton variant="rectangular" width="100%" height={300} />
                            :
                                <img src={imagefont} className={classImageFond}/>
                            }
                        </Grid>
                        <Grid item xs={12} style={{boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)"}}>
                            <TabsBase
                                value={menu}
                                onChange={this.changeMenu}
                            >
                                <TabBase label="Accueil" />
                                <TabBase label="Équipe" />
                                <TabBase label="Joueurs" />
                                <TabBase label="Matchs" />
                                <TabBase label="Paramètres" />
                            </TabsBase>
                        </Grid>
                        {club !== null &&
                            <Grid item xs={12} >
                                <div style={{margin: 20, flexGrow: 1}}>
                                    {this.getBody(menu, club)}
                                </div>
                            </Grid>
                        }
                        
                    </React.Fragment>
                }
            </Grid>
        )
    }
}