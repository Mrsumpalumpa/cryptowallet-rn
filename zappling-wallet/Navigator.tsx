import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReportScreen from './screens/ReportScreen';
import { RootStackParamsList } from './models/generics';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from './providers/AuthProvider';
import { View, Text, Pressable, StyleSheet,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo's vector icons library
import SnakeScreen from './screens/SnakeScreen';
import FloatingMenu from './components/Menu';
import WalletScreen from './screens/WalletScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();



export default function Navigator() {
    const {auth} = useAuthContext()
    //const auth = true
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
                                backgroundColor: 'transparent',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true, // Make header background transparent
                            headerTitle: '', // Remove title
                            headerLeft: () => (
                                <FloatingMenu/>
                            ),
                        }} 
                    />
                    <Stack.Screen 
                        name="Report" 
                        component={ReportScreen} 
                        options={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true, // Make header background transparent
                            headerTitle: '', // Remove title
                            headerLeft: () => (
                                <FloatingMenu/>
                          
                            ),
                            
                        }}
                    />
                    <Stack.Screen 
                        name="Snake" 
                        component={SnakeScreen} 
                        options={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true, // Make header background transparent
                            headerTitle: '', // Remove title
                            headerLeft: () => (
                                <FloatingMenu/>
                            ),
                            
                        }}
                    />
                    <Stack.Screen 
                        name="Wallet" 
                        component={WalletScreen} 
                        options={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true, // Make header background transparent
                            headerTitle: '', // Remove title
                            headerLeft: () => (
                                <FloatingMenu/>
                          
                            ),
                            
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
                            backgroundColor: 'transparent',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                            fontWeight: 'bold',
                            
                        },
                        headerTransparent: true, // Make header background transparent
                        headerTitle: '', // Remove title
                        headerLeft: () => (
                            <FloatingMenu/>
                        ),
                        
                    }}
                    />
            )
        }
        
       
      </Stack.Navigator>
      

    </NavigationContainer>
    </>
  );
}