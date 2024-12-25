import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, TextInput, ActivityIndicator,Image,View} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginScreenProps } from '../models/generics';
import { loginEmail } from '../requests/api';
import { useAuthContext } from '../providers/AuthProvider';
import ThreeDSphere from './Sphere';
import icon from '../assets/logo1.png'
// Validation schema
const schema = Yup.object({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type FormData = {
  email: string;
  password: string;
};

export default function Login(props: LoginScreenProps) {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { setAuth } = useAuthContext();
  const [loading,setLoading] = useState(false)
  const onSubmit = (data: FormData) => {
    loginEmail(data.email, data.password).then((r) => {
      setLoading(true)
      if (r.status === 200 || r.status === 201) {
        setAuth(r.data);
        // props.navigation.push('Profile');
      } else {
        alert(`Request Error ${r.status}: ${r.statusText}`);
      }
      setLoading(false)

    }).catch((err) => {
      setLoading(false)
      alert(`UNCONTROLLED ERROR ${JSON.stringify(err)}`);
    });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      
      <SafeAreaView style={styles.safeArea}>
        <ThreeDSphere />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Email"
              autoComplete="email"
              inputMode="email"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Password"
              secureTextEntry
              autoComplete="password"
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {!loading?
          <View style={{
            display: 'flex',
            flexDirection:'row',
            flexWrap:'nowrap',
            alignItems:'center',
            justifyContent:'center'
            }}>
            <Text style={styles.text}>Log In </Text>
            <Image source={icon} style={{width:30,height:30}} />
          </View>
          :<ActivityIndicator style={styles.loading}/>}
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 500,
    
  },
  loading:{
    color:'white',
    height:50,
    fontSize:50
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
    display:'flex',
    justifyContent:'center',
    backgroundColor: '#6f69eb',
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: 230,
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    borderColor:'#6f69eb',
    backgroundColor:'white',
    color:"#6f69eb"
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
