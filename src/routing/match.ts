import { FormulaireMatch } from "pages/Formulaire/FormulaireMatch";
import { IRoute } from ".";

export const URL_CREER_MATCH = `/creer/match`

const routes: Array<IRoute> = [
    {
        url : URL_CREER_MATCH,
        exact: true,
        component: FormulaireMatch
    }
]

export default routes