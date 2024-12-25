import { View,Text,Pressable,StyleSheet } from 'react-native';
import { ProfileScreenProps } from '../models/generics';
import { useAuthContext } from '../providers/AuthProvider';
const Profile = (props:ProfileScreenProps) => {
    const { logoutUser,setAuth } = useAuthContext()
    return (
      <View style={styles.container}>
        <Pressable 
          style={styles.button} 
          onPress={()=>{props.navigation.push('Report')}}
        >
            {<Text style={styles.text}>Go to reports</Text>}
        </Pressable>
        <Pressable 
          style={styles.button} 
          onPress={()=>{props.navigation.push('Snake')}}
        > 
            {<Text style={styles.text}>Play fuckin Snake</Text>}
        </Pressable>
        <Pressable 
          style={styles.button} 
          onPress={()=>{
            setAuth(null)
            logoutUser.refetch()
        }}
        >
            {<Text style={styles.text}>Logout</Text>}
        </Pressable>
      </View>

  )};
export default Profile

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    columnGap:3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
  
  text: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: 230,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#9fc6e8',
    borderRadius: 5,
  },
 
});
