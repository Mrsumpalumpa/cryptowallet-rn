import React, { createContext, useContext} from 'react'
import { useQuery,UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { getShit } from '../requests/api'

export interface IReportContext{
    report:UseQueryResult<AxiosResponse<any[]>>
}
export const ReportContext = createContext<IReportContext|null>(null)

export type ReportContextProps = {
    children:React.ReactNode
}

const ReportProvider:React.FC<ReportContextProps> = ({children})=>{
    const report = useQuery({
        queryKey:['report'],
        queryFn: ()=>getShit()
    })
    return(
        <ReportContext.Provider value={{report}}>
            {children}
        </ReportContext.Provider>
    )
}
export const useReportContext =()=>{
    const ctx = useContext(ReportContext) as IReportContext
    return ctx
}
export default ReportProvider