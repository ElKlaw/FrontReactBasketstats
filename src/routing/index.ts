import { ClubsSearch } from "pages/Club/ClubsSearch"
import routeMatch from "./match"
import routeEquipe from "./equipe"
import { routesClub } from "./club"

export interface IRoute {
    url: string
    exact?: boolean
    component: any
}

export default [
    {
        url : "/",
        exact: true,
        component: ClubsSearch
    },
    ...routesClub,
    ...routeMatch,
    ...routeEquipe
]