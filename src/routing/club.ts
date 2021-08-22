import { AccueilClub } from "pages/Club/commun/AccueilClub";
import { EquipeClub } from "pages/Club/commun/EquipeClub";
import { JoueurClub } from "pages/Club/commun/JoueurClub";
import { MatchClub } from "pages/Club/commun/MatchClub";
import { ParametreClub } from "pages/Club/commun/ParametreClub";
import { FormulaireClub } from "pages/Formulaire/FormulaireClub";
import { IRoute } from ".";
import { ClubDetail } from "../pages/Club/ClubDetail";
import { ClubsSearch } from "../pages/Club/ClubsSearch";

export const URL_CLUB = `/club/:id`
export const URL_CLUBS = `/clubs`
export const URL_CREATE_CLUB = `/creer-club`

export const routesClub: Array<IRoute> = [
    {
        url : URL_CLUB,
        component: ClubDetail
    },
    {
        url : URL_CLUBS,
        exact: true,
        component: ClubsSearch
    },
    {
        url : URL_CREATE_CLUB,
        exact: true,
        component: FormulaireClub
    }
]

export const URL_ACCUEIL = "/accueil"
export const URL_EQUIPE = "/equipe"
export const URL_JOUEUR = "/joueur"
export const URL_MATCH = "/match"
export const URL_PARAMETRE = "/parametre"

export const subRoutesClub: Array<IRoute> = [
    {
        url : URL_CLUB + URL_ACCUEIL,
        component: AccueilClub
    },
    {
        url : URL_CLUB + URL_EQUIPE,
        component: EquipeClub
    },
    {
        url : URL_CLUB + URL_JOUEUR,
        component: JoueurClub
    },
    {
        url : URL_CLUB + URL_MATCH,
        component: MatchClub
    },
    {
        url : URL_CLUB + URL_PARAMETRE,
        component: ParametreClub
    },
]