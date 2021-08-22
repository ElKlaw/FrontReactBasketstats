import { DataGouvVille } from "../model/DataGouv";

export function getVille(search: string): Promise<Array<DataGouvVille>>{
  return fetch(
    `https://geo.api.gouv.fr/communes?nom=${search}&fields=nom,codesPostaux,departement,region&format=json&limit=10`
  ).then(_ => _.json())
} 