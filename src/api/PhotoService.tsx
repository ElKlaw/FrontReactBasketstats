import { fetchApiImage } from "../utils/fetchUtils";

export function getPhotoById(id : number){
    const options = {
        'responseType': 'blob'
    }
    return fetchApiImage('/photo/' + id.toString(), options)
}