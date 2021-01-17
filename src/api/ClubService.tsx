import { fetchApi } from "../utils/fetchUtils";



export function searchClub(nom : string, page : number, size : number){
    const options = {
        'Content-Type': 'application/json'
    }
    return fetchApi('/clubs/results?search_query=' + nom + '&page=' + page.toString() + '&size=' + size.toString(), options)
}