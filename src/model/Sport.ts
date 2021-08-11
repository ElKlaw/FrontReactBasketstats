

export interface Sport {
    id: number
    nom: string
    niveaux: Array<Niveau> 
}

export interface Niveau {
    id: number
    nom: string
    divisions: Array<Niveau> 
}

export interface Division {
    id: number
    nom: string
    poules: Array<Niveau> 
}

export interface Poule {
    id: number
    nom: string
}