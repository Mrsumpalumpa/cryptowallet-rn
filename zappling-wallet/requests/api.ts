import axios ,{AxiosResponse}from "axios";

interface IParams{
    [key:string]:string|number|string[]|number[]|boolean
}

const api = axios.create({
    withCredentials:false
})

export async function loginEmail(email:string,pass:string):Promise<AxiosResponse<any>>{
    const form = new FormData()
    form.append('email',email)
    form.append('pass',pass)
    return api.post('https://jsonplaceholder.typicode.com/posts',form)
}

export async function logout():Promise<AxiosResponse<any>>{
    return api.get('https://api.ojete.com/logout')
}

export async function getShit():Promise<AxiosResponse<any>>{
    return api.get('https://jsonplaceholder.typicode.com/albums')
}