import { Club } from "./Club";

export interface Equipe {
    id: number
    saison: number
    phase: number
    nom: string
    categorie: string
    sexe: string
    niveau: string
    division: string
    poule: string
    photo: number
    clubEquipe: Club
}