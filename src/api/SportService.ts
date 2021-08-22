import { Sport } from "model/Sport";
import { fetchApi } from "utils/fetchUtils";


export function fetchSports() : Promise<Array<Sport>>{
    return fetchApi(`/sports`,{
        method: "GET"
    })
}