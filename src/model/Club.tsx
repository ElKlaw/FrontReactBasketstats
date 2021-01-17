import { Photo } from "./Photo";
import { Salle } from "./Salle";
import { Ville } from "./Ville";


export interface Club {
    id: number
    nomcomplet: string
    url: string
    nom: string
    codeClub: string
    sport: string
    villes: Ville[]
    salles: Salle[]
    fond: Photo
    logo: Photo
    imagefont?: Blob
    imagelogo?: Blob
}