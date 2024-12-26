import { View,Text,Pressable,StyleSheet } from 'react-native';
import { ProfileScreenProps } from '../models/generics';
import { useAuthContext } from '../providers/AuthProvider';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Profile = (props:ProfileScreenProps) => {
    const { logoutUser,setAuth } = useAuthContext()
    return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
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

        </SafeAreaView>

      </SafeAreaProvider>



  )};
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 500,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    columnGap:3,
    
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 25,
    zIndex: 5, // Ensure the form is in front of the sphere
    position:'relative',
    
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
