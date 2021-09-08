import { Adresse } from "./Adresse";

export interface Lieu {
    id: number
    nom: string
    salle: boolean
    adresse: Adresse
}