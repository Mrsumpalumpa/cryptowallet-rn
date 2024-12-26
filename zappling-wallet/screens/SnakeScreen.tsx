import {  SnakeScreenProps } from '../models/generics';
import Snake from '../components/Snake';

const SnakeScreen = (props:SnakeScreenProps) => {
    return (
     <Snake {...props}/>

  )};
export default SnakeScreen
