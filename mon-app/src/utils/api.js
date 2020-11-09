/**
 * Représente une erreur renvoyée par l'API
 */
export class ApiErrors{
    constructor(errors){
        this.errors = errors
    }
}

/**
 * @params {string} endpoint
 * @params {string} options
 */
export async function apifetch(endpoint, options = {}){
    const response = await fetch('http://127.0.0.1:8000' + endpoint, {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
        ...options
    })
    if(response.status === 204){
        return null;
    }
    const responseData = await response.json()
    // if(response.ok){
    //     return responseData;
    // }else{
    //     if(responseData.errors){
    //         throw new ApiErrors(responseData.errors)
    //     }
    // }
    console.log(responseData)
}