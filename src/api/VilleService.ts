import { Ville } from "model/Ville"
import { fetchApi } from "utils/fetchUtils"


export function getVilleByClubId( id : string ) : Promise<Ville>{
    return fetchApi(`/club/${id}/villes`,{
        method: "GET"
    })
}

export function ajouterVille( ville : any ) : Promise<Ville>{
    return fetchApi('/ville',{
        method: "POST",
        body: JSON.stringify(ville)
    })
}

export function modifierVille(id: number, ville : any ) : Promise<Ville>{
    return fetchApi(`/ville/${id}`,{
        method: "PUT",
        body: JSON.stringify(ville)
    })
}

export function supprimerVille(id: number) : Promise<void>{
    return fetchApi(`/ville/${id}`,{
        method: "DELETE"
    })
}