import Navigator from "./Navigator"
import AuthProvider from './providers/AuthProvider';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const { networkConfig } = createNetworkConfig({
	localnet: { url: getFullnodeUrl('localnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient()

export default function App(){

  return(
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider>
          <AuthProvider>
            <Navigator/>
          </AuthProvider>
        </WalletProvider>

      </SuiClientProvider>
    </QueryClientProvider>
  )
}