

const apiUrl = 'http://localhost:8080'

const headers : any = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export function fetchApi(url: string, options: any) {
    return fetch(apiUrl + url,{
        headers,
        ...options
    }).then(res=> res.json())
}

export function fetchApiImage(url: string, options: any) {
    return fetch(apiUrl + url,{
        ...options
    }).then(res => res.json())
}