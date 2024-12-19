import Navigator from "./Navigator"
import AuthProvider from './providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App(){
  return(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigator/>
      </AuthProvider>
    </QueryClientProvider>
  )
}