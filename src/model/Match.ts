import { Adresse } from "./Adresse";
import { Equipe } from "./Equipe";
import { Salle } from "./Salle";

export interface Match {
    id?: number
    dateMatch: Date
    domicile: boolean
    heureMatch: Date
    heureRDV: Date
    adversaire: string
    scoreEquipe: number | null
    scoreAdversaire: number | null
    infosSup: string
    equipe: Equipe
    adresseRdv: Adresse | null
    salleMatch: Salle| null
    adresseMatch: Adresse | null
}

export interface MatchsByMonth {
    key: string
    value: Array<Match>
}