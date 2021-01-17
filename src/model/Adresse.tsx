import { Ville } from "./Ville";

export interface Adresse {
    id: number
    numRue: number
    nomRue: string
    longitude: string
    latitude: string
    ville: Ville
}