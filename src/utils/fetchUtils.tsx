

const apiUrl = 'http://localhost:8080'

export function fetchApi(url: string, options: any) {
    return fetch(apiUrl + url,{
        ...options
    }).then(res=> res.json())
}

export function fetchApiImage(url: string, options: any) {
    return fetch(apiUrl + url,{
        ...options
    }).then(res => res.blob())
}