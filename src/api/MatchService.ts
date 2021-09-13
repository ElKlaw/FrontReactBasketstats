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

export function addMatch( match : any ) : Promise<Match>{
    return fetchApi('/match',{
        method: "POST",
        body: JSON.stringify(match)
    })
}