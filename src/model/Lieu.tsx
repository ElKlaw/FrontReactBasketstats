import { Adresse } from "./Adresse";
import { Club } from "./Club";


export interface Lieu {
    id: number
    nom: string
    salle: boolean
    adresse: Adresse
    clubSalle: Club
}