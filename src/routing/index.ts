import { ClubsSearch } from "pages/Club/ClubsSearch"
import routeMatch from "./match"
import { routesClub } from "./club"

export interface IRoute {
    url: string
    exact?: boolean
    component: any
}

const routes = [
    {
        url : "/",
        exact: true,
        component: ClubsSearch
    },
    ...routesClub,
    ...routeMatch
]

export default routes