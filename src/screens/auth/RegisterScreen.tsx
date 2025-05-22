import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, GestureResponderEvent } from 'react-native';
import { useForm } from '../../hooks/common/useForm';
import { registerSchema } from '../../utils/validation';
import { FormInput } from '../../components/Form/FormInput';
import { LAYOUT, SPACING } from '../../theme/layout';
import { colors } from '../../theme/colors';
import { AuthScreenProps } from '../../navigation/types';

type RegisterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const RegisterScreen = ({ navigation }: AuthScreenProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm<RegisterFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // TODO: Implement register logic
      console.log('Register values:', values);
    },
  });

  const handleSubmitPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.subtitle}>Tạo tài khoản mới</Text>
      </View>

      <View style={styles.form}>
        <FormInput
          label="Họ và tên"
          value={values.fullName}
          onChangeText={handleChange('fullName')}
          onBlur={() => handleBlur('fullName')}
          error={errors.fullName}
          touched={touched.fullName}
          placeholder="Nhập họ và tên của bạn"
        />

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
          label="Số điện thoại"
          value={values.phone}
          onChangeText={handleChange('phone')}
          onBlur={() => handleBlur('phone')}
          error={errors.phone}
          touched={touched.phone}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
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

        <FormInput
          label="Xác nhận mật khẩu"
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={() => handleBlur('confirmPassword')}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          placeholder="Nhập lại mật khẩu của bạn"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmitPress}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.blue.main,
    fontSize: 14,
    fontWeight: '600',
  },
}); 