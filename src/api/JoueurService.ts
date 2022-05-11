import { Joueur } from "model/Joueur"
import { fetchApi } from "utils/fetchUtils"


export function getJoueursByEquipeId( id : number ) : Promise<Array<Joueur>>{
  return fetchApi(`/equipe/${id}/joueurs`,{
      method: "GET"
  })
}


export function getJoueursByClubId( id : number ) : Promise<Array<Joueur>>{
  return fetchApi(`/club/${id}/joueurs`,{
      method: "GET"
  })
}

export function addJoueur( joueur : any ) : Promise<Joueur>{
  return fetchApi('/joueur',{
      method: "POST",
      body: JSON.stringify(joueur)
  })
}