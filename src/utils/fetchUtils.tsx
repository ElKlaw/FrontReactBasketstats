

const apiUrl = 'http://localhost:8080'

const header : any = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const optionsBlob : any = {
    'responseType': 'blob'
}


export function fetchApi(url: string, options: any) {
    return fetch(apiUrl + url,{
        header,
        ...options
    }).then(res=> res.json())
}

export function fetchApiImage(url: string, options: any) {
    return fetch(apiUrl + url,{
        header,
        ...options
    }).then(res => res.json())
}