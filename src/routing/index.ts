import { ClubsSearch } from "pages/Club/ClubsSearch"
import routeClub from "./club"
import routeMatch from "./match"

export interface IRoute {
    url: string
    exact: boolean
    component: any
}

export default [
    {
        url : "/",
        exact: true,
        component: ClubsSearch
    },
    ...routeClub,
    ...routeMatch
]