import Login from '../components/Login';
import {LoginScreenProps} from '../models/generics'

const LoginScreen = (props:LoginScreenProps) => {
    return (
      <>
      <Login {...props}/>
      </>
    
  )};
export default LoginScreen