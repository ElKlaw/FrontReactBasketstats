import { fetchApiImage } from "../utils/fetchUtils";



export function getPhotoById(id : number){ 
    return fetchApiImage('/photo/' + id.toString(),{
        method: "GET"
    })
}


export function addPhoto(photo : any){ 
    const formData = new FormData()
    formData.append("image", photo)
    return fetchApiImage('/photo',{
        method: "POST",
        body: formData
    })
}