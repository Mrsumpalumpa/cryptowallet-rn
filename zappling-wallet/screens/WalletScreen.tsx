
import {WalletScreenProps} from '../models/generics'
import Wallet from '../components/Wallet';
const WalletScreen = (props:WalletScreenProps) => {
    return (
      <>
        <Wallet {...props}/>
      </>
    
  )};
export default WalletScreen