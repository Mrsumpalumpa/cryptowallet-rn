import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList ={
    Login:undefined,
    Report:undefined,
    Profile:undefined
}

export type LoginScreenProps = NativeStackScreenProps<RootStackParamsList,"Login">
export type ReportScreenProps = NativeStackScreenProps<RootStackParamsList,"Report">
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamsList,"Profile">
