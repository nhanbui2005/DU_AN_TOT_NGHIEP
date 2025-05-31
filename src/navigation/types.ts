import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

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
  Main: undefined
  Check: undefined;
  Setting: undefined;
  Profile: undefined;
  User: undefined;
  Addresses: undefined;
  ProductDetail:undefined;
  CheckoutScreen: undefined
  Notification: undefined
  CartScreen: undefined
  // Add more screens here
};

export type MainNavProp = NativeStackNavigationProp<MainStackParamList, 'Main'>;

export const PageNames = {
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
  ProductDetail: 'ProductDetail',
  CheckoutScreen: 'CheckoutScreen',
  Notification: 'Notification',
  CartScreen: 'CartScreen'
} as const; 