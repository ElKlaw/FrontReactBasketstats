import { Equipe } from "./Equipe";

export interface Match {
    id: number
    dateMatch: Date
    domicile: boolean
    heureMatch: Date
    heureRDV: Date
    adversaire: string
    scoreEquipe: number | null
    scoreAdversaire: number | null
    infosSup: string
    equipe: Equipe
}

export interface MatchsByMonth {
    key: string
    value: Array<Match>
}