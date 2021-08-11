import { Equipe } from "model/Equipe";
import { fetchApi } from "utils/fetchUtils";


export function getEquipesByClubId( id : number ) : Promise<Array<Equipe>>{
    return fetchApi(`/club/${id}/equipes`,{
        method: "GET"
    })
}