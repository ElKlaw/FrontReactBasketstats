import { FormulaireClub } from "pages/Formulaire/FormulaireClub";
import { IRoute } from ".";
import { ClubDetail } from "../pages/Club/ClubDetail";
import { ClubsSearch } from "../pages/Club/ClubsSearch";

export const URL_CLUB = `/club/:id`
export const URL_CLUBS = `/clubs`
export const URL_CREATE_CLUB = `/creer-club`

const routes: Array<IRoute> = [
    {
        url : URL_CLUB,
        exact: true,
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

export default routes