import { View,Text,Pressable,StyleSheet } from 'react-native';
import { ProfileScreenProps } from '../models/generics';
import { useAuthContext } from '../providers/AuthProvider';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ThreeDSphere from './Sphere';
import { useSuiClientQuery } from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient,PaginatedCoins } from '@mysten/sui/client';
import { useEffect,useState } from 'react';

const Profile = (props:ProfileScreenProps) => {
    const [coins,setPaginedCoins]=useState<PaginatedCoins|null>(null)
    const { data, isPending, error, refetch } = useSuiClientQuery('getOwnedObjects', {
      owner: '0x4dd58501a65757494cfd6b4f4390d64b1d1df3bea4efad8e78c2f69887e9aef0',
    });
 
    // use getFullnodeUrl to define Devnet RPC location
    const rpcUrl = getFullnodeUrl('mainnet');
    
    // create a client connected to devnet
    const client = new SuiClient({ url: rpcUrl });
    
    // get coins owned by an address
    // replace <OWNER_ADDRESS> with actual address in the form of 0x123...
    const getSuiCoins = async()=>await client.getCoins({
      owner: '0x4dd58501a65757494cfd6b4f4390d64b1d1df3bea4efad8e78c2f69887e9aef0',
    });
    useEffect(()=>{
      getSuiCoins().then(r=>{
        alert(JSON.stringify(r))
        setPaginedCoins(r)})
    },[])
    return (
      <SafeAreaProvider style={styles.container}>
        <ThreeDSphere/>
        <SafeAreaView style={styles.safeArea}>
          {isPending?<Text>Loading...</Text>
          :<Text>{JSON.stringify(data)}</Text>
          }
           {error?<Text>{JSON.stringify(error)}</Text>
          :<Text>{JSON.stringify(data)}</Text>
          }
          <Text>{JSON.stringify(coins)}</Text>
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
