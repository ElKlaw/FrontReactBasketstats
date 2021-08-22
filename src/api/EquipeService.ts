import { Equipe } from "model/Equipe";
import { fetchApi } from "utils/fetchUtils";

export function getEquipeById( id : string | number ) : Promise<Equipe>{
    return fetchApi(`/equipe/${id}`,{
        method: "GET"
    })
}

export function getEquipesByClubId( id : number ) : Promise<Array<Equipe>>{
    return fetchApi(`/club/${id}/equipes`,{
        method: "GET"
    })
}

export function addEquipe( equipe : any ) : Promise<Equipe>{
    return fetchApi('/equipe',{
        method: "POST",
        body: JSON.stringify(equipe)
    })
}