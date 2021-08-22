export interface DataGouvVille {
  nom: string
  codesPostaux: Array<string>
  code: string
  departement?: {
    code: string
    nom: string
  },
  region?: {
    code: string,
    nom: string
  }
}


export interface DataGouv {
  type: string
  version: string
  features: Array<FeatureDataGouv>
}

export interface FeatureDataGouv {
  type: string
  geometry: Geometry
  properties: Properties
}

interface Geometry {
  type: string
  coordinates: Array<number>
}

interface Properties {
  label: string
  score: number
  id: string
  type: string
  name: string
  postcode: string
  citycode: string
  x: number
  y: number
  population: number
  city: string
  context: string
  importance: number
}


