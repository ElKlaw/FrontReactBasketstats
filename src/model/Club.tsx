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
    villes: Array<Ville>
    salles: Array<Salle>
    fond: number
    logo: number
    couleurprincipale: string
    couleursecondaire: string
}