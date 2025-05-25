import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verify: { phone: string };
  ResetPassword: { phone: string; otp: string };
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList>;

export type MainStackParamList = {
  Home: undefined;
  Shop: undefined;
  Booking: undefined;
  Card: undefined;
  Check: undefined;
  Setting: undefined;
  Profile: undefined;
  // Add more screens here
};

export const PageNames = {
  Auth: 'Auth',
  Main: 'Main',
  Login: 'Login',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  Verify: 'Verify',
  ResetPassword: 'ResetPassword',
  Home: 'Home',
  Shop: 'Shop',
  Booking: 'Booking',
  Card: 'Card',
  Check: 'Check',
  Setting: 'Setting',
  Profile: 'Profile',
} as const; 