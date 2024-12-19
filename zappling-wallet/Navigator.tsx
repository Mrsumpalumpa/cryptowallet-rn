import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReportScreen from './screens/ReportScreen';
import { RootStackParamsList } from './models/generics';

import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from './providers/AuthProvider';


const Stack = createNativeStackNavigator<RootStackParamsList>();


export default function Navigator() {
    const {auth} = useAuthContext()
  return (
    <>
    <StatusBar style='dark'/>      

    <NavigationContainer>
      
      <Stack.Navigator  >
        {auth
            ?(
                <>
                    <Stack.Screen 
                        name="Profile" 
                        component={ProfileScreen}
                        options={{
                            headerStyle: {
                            backgroundColor: '#9fc6e8',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                            fontWeight: 'bold',
                            },
                        }} 
                    />
                    <Stack.Screen 
                        name="Report" 
                        component={ReportScreen} 
                        options={{
                            headerStyle: {
                            backgroundColor: '#9fc6e8',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                            fontWeight: 'bold',
                            },
                        }}
                    />
                </>
            )
            :(
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerStyle: {
                        backgroundColor:'#9fc6e8',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        
                    }}
                    />
            )
        }
        
       
      </Stack.Navigator>
      

    </NavigationContainer>
    </>
  );
}