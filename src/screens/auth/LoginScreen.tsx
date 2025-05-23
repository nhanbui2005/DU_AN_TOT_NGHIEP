import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { useForm } from '../../hooks/common/useForm';
import { loginSchema } from '../../utils/validation';
import { FormInput } from '../../components/Form/FormInput';
import { LAYOUT, SPACING } from '../../theme/layout';
import { colors } from '../../theme/colors';
import { AuthScreenProps } from '../../navigation/types';

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginScreen = ({ navigation }: AuthScreenProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // TODO: Implement login logic
      console.log('Login values:', values);
    },
  });

  const handleSubmitPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
    
      </View>

      <View style={styles.form}>
        <FormInput
          label="Email"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          touched={touched.email}
          placeholder="Nhập email của bạn"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
        <FormInput
          label="Mật khẩu"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={() => handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          placeholder="Nhập mật khẩu của bạn"
        secureTextEntry
      />
      
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmitPress}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: SPACING.L,
    paddingTop: SPACING.XL,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  form: {
    padding: SPACING.L,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.L,
  },
  forgotPasswordText: {
    color: colors.blue.main,
    fontSize: 14,
  },
  button: {
    ...LAYOUT.BUTTON,
    ...LAYOUT.BUTTON_PRIMARY,
    marginBottom: SPACING.M,
  },
  buttonDisabled: {
    ...LAYOUT.BUTTON_DISABLED,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  registerLink: {
    color: colors.blue.main,
    fontSize: 14,
    fontWeight: '600',
  },
}); 