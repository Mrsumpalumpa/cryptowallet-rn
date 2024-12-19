import React, { createContext, useContext,useState,useEffect } from 'react'
import {  useQuery,UseQueryResult } from '@tanstack/react-query'
//useMutation, UseMutationResult,
import { AxiosResponse } from 'axios'
import { logout } from '../requests/api' 
//loginEmail,

interface IAuth{
    id:number
}
export interface IAuthContext{
    logoutUser:UseQueryResult<AxiosResponse<any>>
    auth:IAuth|null
    setAuth:React.Dispatch<React.SetStateAction<IAuth|null>>
    // login:UseMutationResult<AxiosResponse<any>>
}
export const AuthContext = createContext<IAuthContext|null>(null)

export type AuthContextProps = {
    children:React.ReactNode
}

const AuthProvider:React.FC<AuthContextProps> = ({children})=>{
    const [auth,setAuth]=useState<IAuth|null>(null)
    const logoutUser = useQuery({
        queryKey:['Auth'],
        queryFn: ()=>logout(),
        enabled:false
    })
    // const login= useMutation({
    //     mutationKey:['Auth'],
    //     mutationFn: ()=>new Promise(()=>alert('working'))
    // })
    
    return(
        <AuthContext.Provider value={{logoutUser,auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext =()=>{
    const ctx = useContext(AuthContext) as IAuthContext
    return ctx
}
export default AuthProvider