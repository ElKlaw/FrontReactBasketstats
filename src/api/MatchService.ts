import { Match } from "model/Match";
import { fetchApi } from "utils/fetchUtils";


export function getMatchsPasseByClubId( id : number ) : Promise<Array<Match>>{
    return fetchApi(`/club/${id}/matchs?type=PASSE`,{
        method: "GET"
    }).then(res=> res.content)
}

export function getMatchsFuturByClubId( id : number ) : Promise<Array<Match>>{
    return fetchApi(`/club/${id}/matchs?type=FUTUR`,{
        method: "GET"
    }).then(res=> res.content)
}

export function getMatchsPasseByEquipeId( id : number ) : Promise<Array<Match>>{
    return fetchApi(`/equipe/${id}/matchs?type=PASSE`,{
        method: "GET"
    }).then(res=> res.content)
}

export function getMatchsFuturByEquipeId( id : number ) : Promise<Array<Match>>{
    return fetchApi(`/equipe/${id}/matchs?type=FUTUR`,{
        method: "GET"
    }).then(res=> res.content)
}

export function addMatch( match : any ) : Promise<Match>{
    return fetchApi('/match',{
        method: "POST",
        body: JSON.stringify(match)
    })
}

export function modifierMatch(id: number, match : any ) : Promise<Match>{
    return fetchApi(`/match/${id}`,{
        method: "PUT",
        body: JSON.stringify(match)
    })
}

export function modifierScoreMatch(id: number, match : any ) : Promise<Match>{
    return fetchApi(`/match/${id}/score`,{
        method: "PUT",
        body: JSON.stringify(match)
    })
}
