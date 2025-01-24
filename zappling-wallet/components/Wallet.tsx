import { useState,useEffect } from 'react';
import { View,Text,Pressable,StyleSheet } from 'react-native';
import {  WalletScreenProps } from '../models/generics';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ThreeDSphere from './Sphere';
import { LightningAddress } from "@getalby/lightning-tools";


const Wallet = (props:WalletScreenProps) => {
    const [address,setAddress] = useState('')
    const getLightningAddress = async ()=>{
      try{
            const ln = new LightningAddress("marceloct1986@gmail.com");
            const result = await ln.fetch()
            console.log(result)
            return result
            
        }
        catch(err){
            alert(`Error getting lightning Address: ${JSON.stringify(err)}`)
        }
    }
    useEffect(()=>{
        getLightningAddress()
    },[])
    return (
      <SafeAreaProvider style={styles.container}>
        <ThreeDSphere/>
        <SafeAreaView style={styles.safeArea}>
         
          <Pressable 
            style={styles.button} 
            onPress={()=>{getLightningAddress()}}
          > 
              {<Text style={styles.text}>get address</Text>}
          </Pressable>
         

        </SafeAreaView>

      </SafeAreaProvider>



  )};
export default Wallet

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
