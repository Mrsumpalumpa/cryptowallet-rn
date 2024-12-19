import React from 'react';
import { StyleSheet, Text, Image, Pressable, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginScreenProps } from '../models/generics';
import { loginEmail } from '../requests/api';
import { useAuthContext } from '../providers/AuthProvider';

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

const icon = require('../assets/logo.png');

export default function Login(props: LoginScreenProps) {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { setAuth } = useAuthContext()
  const onSubmit = (data: FormData) => {
    loginEmail(data.email,data.password).then((r)=>{
      if(r.status===200||r.status===201){
        setAuth(r.data)
        props.navigation.push('Profile');
      }
      else{
        alert(`Request Error ${r.status}: ${r.statusText}`)
      }
    }).catch((err)=>{
      alert(`UNCONTROLLED ERROR  ${JSON.stringify(err)}` );

    })
  };

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <Image source={icon} style={styles.image} />
        <SafeAreaView style={styles.safeArea}>
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
            {<Text style={styles.text}>Log In</Text>}
          </Pressable>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    rowGap: 15,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
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
  input: {
    height: 40,
    width: 230,
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
