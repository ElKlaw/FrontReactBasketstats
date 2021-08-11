import { Salle } from "./Salle";
import { Sport } from "./Sport";
import { Ville } from "./Ville";


export interface Club {
    id: number
    nomcomplet: string
    url: string
    nom: string
    codeClub: string
    sport: Sport
    villes: Ville[]
    salles: Salle[]
    fond: number
    logo: number
}