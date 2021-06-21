export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse =(response) => {
return response.ok ? response.json() : Promise.reject( new Error(`Ошибка ${response.status}: ${response.statusText}`))
}

export const register = (data) => {
    return fetch(`${BASE_URL}/auth/local/signup` , {
     method: 'POST'  ,
     headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
     } ,
     body: JSON.stringify({ password: data.password, email: data.email})
    })
    .then(response => checkResponse(response))
        
}

export const autorize = (data) => {
    return fetch(`${BASE_URL}/auth/local/signin` , {
     method: 'POST'  ,
     headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
     } ,
     body: JSON.stringify({ password: data.password, email: data.email})
    })
    .then(response => checkResponse(response))
        
}

export const checkToken=(jwt)=>{
    return fetch(`${BASE_URL}/auth/local/users/me`, 
    {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
     } )
       .then(response => checkResponse(response))
           
   }

