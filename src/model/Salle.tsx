import { Club } from "./Club";
import { Lieu } from "./Lieu";

export interface Salle {
    id: number
    nom: string
    lieu: Lieu
    clubSalle: Club
}