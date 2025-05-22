import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList>;

export type MainStackParamList = {
  Home: undefined;
  Shop: undefined;
  Booking: undefined;
  Card: undefined;
  Profile: undefined;
  // Add more screens here
}; 