import { Club } from "../model/Club";
import { fetchApi } from "../utils/fetchUtils";

export function searchClub(nom : string, page : number, size : number){
    return fetchApi('/clubs/results?search_query=' + nom + '&page=' + page.toString() + '&size=' + size.toString(),{
        method: "GET"
    })
}

export function getClubByURL( url : string ) : Promise<Club>{
    return fetchApi('/club/'+url,{
        method: "GET"
    })
}


export function addClub( club : any ) : Promise<Club>{
    return fetchApi('/club',{
        method: "POST",
        body: JSON.stringify(club)
    })
}