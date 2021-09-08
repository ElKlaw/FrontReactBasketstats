export interface DataGouvAdresse {
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
  housenumber: string
  id: string
  name: string
  postcode: string
  citycode: string
  x: number
  y: number
  city: string
  district: string
  context: string
  type: string
  importance: number
  street: string
}

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