import { Container, Grid, InputAdornment, Typography } from "@material-ui/core";
import { url } from "csx";
import React from "react";
import { style } from "typestyle";
import { searchClub } from "../../api/ClubService";
import { Club } from "../../model/Club";
import imagefond from "../../ressources/fond.jpg";
import SearchIcon from '@material-ui/icons/Search';
import { TextFieldBase } from "../../component/TextField";
import { PaginationBase } from "../../component/Pagination";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ButtonBase } from "../../component/Button";
import { CardClub } from "component/Club/CardClub";

interface Props {
    history: any
}

interface States {
    clubs: Array<Club>
    page: number
    nbreClub: number
    search: string
    nbrePage: number
}
// css
const titre = style({
    fontWeight: 900,
    color: "white"
})

const fond = style({
    backgroundImage: url(imagefond),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
})

export class ClubsSearch extends React.Component<Props, States> {

    constructor(props: Props) {
        super(props)
        this.state = {
            clubs: [],
            page: 0,
            nbreClub: 0,
            search: "",
            nbrePage: 1
        }
    }

    componentDidMount() {
        this.getClubs()
    }

    getClubs = () => {
        const search = this.state.search
        const page = this.state.page
        const elementParPage = 24
        searchClub(search,page,elementParPage).then((result: any) => {
            const clubs = [...result.content]
            this.setState({
                clubs,
                page: page,
                nbrePage: result.totalPages,
                nbreClub: result.totalElements
            })
        })
    }

    handleChangePage = (event : any, newPage: number) => { 
        this.setState({
            page: newPage - 1
        },()=> {
            this.getClubs()
        })
    }

    handleChangeSearch = (event: any) => {
        this.setState({
            search: event.target.value
        },()=> {
            this.getClubs()
        })
    };

    render() {
        const { clubs, page, nbrePage, search } = this.state
        const { history } = this.props
        return (
            <Grid container>
                <Grid item xs={12} className={fond}>
                    <Grid container justifyContent="center" style={{textAlign: "center", padding:15, minHeight: 200}}>
                        <Grid item xs={12}>
                            <Typography variant="h3" className={titre}>
                                Retrouver un club inscrit
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={10} md={8} lg={4} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextFieldBase 
                                        id="input-club" 
                                        placeholder="Rechercher un club" 
                                        variant="outlined"
                                        size="small"
                                        value={search}
                                        fullWidth 
                                        onChange={this.handleChangeSearch}
                                        InputProps={{
                                            startAdornment: 
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonBase
                                        fullWidth
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={()=> history.push(`/creer-club`)}
                                    >
                                        Créer un club
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="lg" style={{marginTop: 30, marginBottom: 30}}>
                        <Grid container spacing={2}>
                            {nbrePage > 1 &&
                                <Grid item xs={12}>
                                    <PaginationBase 
                                        nbrePage={nbrePage} 
                                        page={page+1} 
                                        handleChangePage={this.handleChangePage}
                                    />
                                </Grid>
                            }
                            {clubs.map(club => (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={club.id}>
                                    <CardClub
                                        club={club}
                                        history={history}
                                    />
                                </Grid>
                            ))}
                            {nbrePage > 1 &&
                                <Grid item xs={12}>
                                    <PaginationBase 
                                        nbrePage={nbrePage} 
                                        page={page+1} 
                                        handleChangePage={this.handleChangePage}
                                    />
                                </Grid>
                            }
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            
        )
    }
}