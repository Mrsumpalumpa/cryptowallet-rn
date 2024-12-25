import { useMemo } from 'react';
import { StyleSheet, Text, View,Pressable,ActivityIndicator,FlatList } from 'react-native';
import { ReportScreenProps } from '../models/generics';
import { useReportContext } from '../providers/ReportProvider';

const Report = (props:ReportScreenProps) => {
    const {report} = useReportContext()
    const list:any[] = useMemo(()=>{
      let out = []
      if(report.data && report.isSuccess) out = report.data.data
      return out
    },[report.isLoading,report.isFetching])
    return (
      <>
      
       {report.isLoading||report.isFetching?
       <View>
        <ActivityIndicator style={styles.loading}/>
       </View>:null}
       {report.data && report.data.data && report.isSuccess?(
        <FlatList 
          data={list} 
          renderItem={({item}:any)=>(<Pressable style={styles.pressable} onPress={()=>{alert(item.title)}}>{item.title}</Pressable>)}/>
       ):null}

      </>
  )};
export default Report

const styles = StyleSheet.create({
  loading:{
    color:'#f4511e',
    height:50,
    fontSize:50
  },
  button:{
    width:100,
    height:50,
    paddingBlock:3,
    paddingInline:5,
    display:'flex',
    justifyContent:'center',
    backgroundColor:'#333333',
    borderRadius:'10%',
    position:'relative',
  },
  text:{
    marginBlock:0,
    color:'white',
    textAlign:'center'
  },
  pressable:{
    fontSize:25,
    color: 'purple',
    textAlign: 'center',
    marginBlock:20,
    shadowColor: "purple",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 16,
    minHeight: 30,
    maxWidth: 170,
  },
});
