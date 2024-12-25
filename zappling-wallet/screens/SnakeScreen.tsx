import { ProfileScreenProps } from '../models/generics';
import Snake from '../components/Snake';

const SnakeScreen = (props:ProfileScreenProps) => {
    return (
     <Snake {...props}/>

  )};
export default SnakeScreen
