import {StyleSheet } from 'react-native';
import {  SnakeScreenProps } from '../models/generics';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import SnakeGame from './SnakeGame';
const Snake = (props:SnakeScreenProps) => {
    return (
      <SafeAreaView style={styles.container}>
        <SnakeGame/>
      </SafeAreaView>

  )};
export default Snake

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
