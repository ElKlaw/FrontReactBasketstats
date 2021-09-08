import { DataGouvAdresse, DataGouvVille } from "../model/DataGouv";

export function getVille(search: string): Promise<Array<DataGouvVille>>{
  return fetch(
    `https://geo.api.gouv.fr/communes?nom=${search}&fields=nom,codesPostaux,departement,region&format=json&limit=10`
  ).then(_ => _.json())
} 

export function getAdresse(search: string): Promise<Array<DataGouvAdresse>>{
  return fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${search}&type=housenumber&autocomplete=1`
  ).then(_ => _.json()).then(_ => _.features)
} 