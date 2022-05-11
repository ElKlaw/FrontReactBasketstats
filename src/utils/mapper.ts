import { Adresse } from "model/Adresse"
import { DataGouvAdresse } from "model/DataGouv"

export function MapperDataGouvAdresseToAdresse(dataGouvAdresse : DataGouvAdresse) : Adresse {
  const adresse : Adresse = {
    numRue: dataGouvAdresse.properties.housenumber ? dataGouvAdresse.properties.housenumber : "" ,
    nomRue: dataGouvAdresse.properties.street ? dataGouvAdresse.properties.street : dataGouvAdresse.properties.name,
    longitude: dataGouvAdresse.properties.x.toString(),
    latitude: dataGouvAdresse.properties.y.toString(),
    ville: dataGouvAdresse.properties.city,
    codePostal: dataGouvAdresse.properties.postcode,
  }
  return adresse
}