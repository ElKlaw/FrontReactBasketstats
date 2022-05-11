import { Adresse } from "model/Adresse"
import { fetchApi } from "utils/fetchUtils"

export function ajouterAdresse( adresse : any ) : Promise<Adresse>{
  return fetchApi('/adresse',{
      method: "POST",
      body: JSON.stringify(adresse)
  })
}

export function modifierAdresse(id: number, adresse : any ) : Promise<Adresse>{
  return fetchApi(`/adresse/${id}`,{
      method: "PUT",
      body: JSON.stringify(adresse)
  })
}

export function supprimerAdresse(id: number) : Promise<void>{
  return fetchApi(`/adresse/${id}`,{
      method: "DELETE"
  })
}