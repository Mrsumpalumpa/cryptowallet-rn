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
                                <Pressable onPress={() => alert('Menu opened')}>
                                    <Ionicons name="menu" size={24} color="#6f69eb" />
                                </Pressable>
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
                                <Pressable onPress={() => alert('Menu opened')}>
                                    <Ionicons name="menu" size={24} color="#6f69eb" />
                                </Pressable>
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
                                <Pressable onPress={() => alert('Menu opened')}>
                                    <Ionicons name="menu" size={24} color="#6f69eb" />
                                </Pressable>
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
                            <Pressable onPress={() => alert('Menu opened')} >
                                <Ionicons name="menu" size={24} color="#6f69eb" />
                            </Pressable>
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