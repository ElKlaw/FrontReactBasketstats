
import { EquipeDetail } from "pages/Equipe/EquipeDetail";
import { IRoute } from ".";

export const URL_EQUIPE = `/equipe/:id`

const routes: Array<IRoute> = [
    {
        url : URL_EQUIPE,
        exact: true,
        component: EquipeDetail
    }
]

export default routes