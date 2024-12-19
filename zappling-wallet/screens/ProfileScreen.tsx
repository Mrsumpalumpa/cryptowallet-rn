import { ProfileScreenProps } from '../models/generics';
import Profile from '../components/Profile';

const ProfileScreen = (props:ProfileScreenProps) => {
    return (
     <Profile {...props}/>

  )};
export default ProfileScreen

