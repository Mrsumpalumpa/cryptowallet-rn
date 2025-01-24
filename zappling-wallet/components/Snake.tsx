import {StyleSheet } from 'react-native';
import {  SnakeScreenProps } from '../models/generics';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import SnakeGame from './SnakeGame';
import Snake3DGame from './Snake3DGame';
const Snake = (props:SnakeScreenProps) => {
    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* <SnakeGame/> */}
                <Snake3DGame/>
            </SafeAreaView>
        </SafeAreaProvider>
  )};
export default Snake

const styles = StyleSheet.create({
  // container: {
  //   display:'flex',
  //   flexDirection:'row',
  //   flexWrap:'wrap',
  //   columnGap:3,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   minHeight: 500,
  // },
  // safeArea: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   rowGap: 25,
  //   zIndex: 5, // Ensure the form is in front of the sphere
  //   position:'relative',
    
  // },
  container: {
    flex: 1, // Asegura que el contenedor tome todo el espacio disponible
    backgroundColor: '#000', // Color de fondo negro para contraste
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
