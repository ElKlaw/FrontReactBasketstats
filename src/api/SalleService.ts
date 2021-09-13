import { Salle } from "model/Salle"
import { fetchApi } from "utils/fetchUtils"


export function getSalleByClubId( id : number ) : Promise<Array<Salle>>{
    return fetchApi(`/club/${id}/salle`,{
        method: "GET"
    })
}

export function ajouterSalle( salle : any ) : Promise<Salle>{
    return fetchApi('/salle',{
        method: "POST",
        body: JSON.stringify(salle)
    })
}

export function modifierSalle(id: number, salle : any ) : Promise<Salle>{
    return fetchApi(`/salle/${id}`,{
        method: "PUT",
        body: JSON.stringify(salle)
    })
}

export function supprimerSalle(id: number) : Promise<void>{
    return fetchApi(`/salle/${id}`,{
        method: "DELETE"
    })
}