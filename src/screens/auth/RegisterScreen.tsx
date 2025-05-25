import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormInput } from "../../components/Form/FormInput";
import { SPACING, BORDER_RADIUS } from "../../theme/layout";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/validation";
import authApi from "../../api/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await authApi.register(values);
        Alert.alert(
          "Registration Successful",
          "Please check your email to verify your account",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } catch (error: any) {
        Alert.alert(
          "Registration Failed",
          error.response?.data?.message || "Please try again later"
        );
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <FormInput
        label="Full Name"
        value={values.fullName}
        onChangeText={(text: string) => handleChange("fullName")(text)}
        onBlur={() => handleBlur("fullName")}
        error={touched.fullName ? errors.fullName : undefined}
        placeholder="Enter your full name"
      />

      <FormInput
        label="Email"
        value={values.email}
        onChangeText={(text: string) => handleChange("email")(text)}
        onBlur={() => handleBlur("email")}
        error={touched.email ? errors.email : undefined}
        keyboardType="email-address"
        placeholder="Enter your email"
        autoCapitalize="none"
      />

      <FormInput
        label="Phone Number"
        value={values.phone}
        onChangeText={(text: string) => handleChange("phone")(text)}
        onBlur={() => handleBlur("phone")}
        error={touched.phone ? errors.phone : undefined}
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
        leftIcon={
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>+91</Text>
            <Image
              source={require("@/assets/icons/tick.png")}
              style={styles.arrowIcon}
            />
          </View>
        }
      />

      <FormInput
        label="Password"
        value={values.password}
        onChangeText={(text: string) => handleChange("password")(text)}
        onBlur={() => handleBlur("password")}
        error={touched.password ? errors.password : undefined}
        secureTextEntry={secureText}
        placeholder="Enter your password"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              source={require("@/assets/icons/eye.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        }
      />

      <FormInput
        label="Confirm Password"
        value={values.confirmPassword}
        onChangeText={(text: string) => handleChange("confirmPassword")(text)}
        onBlur={() => handleBlur("confirmPassword")}
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
        secureTextEntry={secureConfirmText}
        placeholder="Confirm your password"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureConfirmText(!secureConfirmText)}>
            <Image
              source={require("@/assets/icons/eye.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        }
      />

      <TouchableOpacity 
        style={[styles.registerButton, isSubmitting && styles.buttonDisabled]}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        <Text style={styles.registerText}>
          {isSubmitting ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: SPACING.L,
  },
  title: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: SPACING.XL,
  },
  prefixContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.S,
  },
  prefixText: {
    fontSize: typography.fontSize.md,
    color: colors.black,
    marginRight: SPACING.XS,
  },
  arrowIcon: {
    width: 12,
    height: 8,
    marginLeft: SPACING.XS,
  },
  icon: {
    width: 23,
    height: 15,
    tintColor: colors.black,
  },
  registerButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  registerText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: "700",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.M,
  },
  loginText: {
    color: colors.grey[600],
    fontSize: typography.fontSize.sm,
  },
  loginLink: {
    color: colors.black,
    fontWeight: "700",
    fontSize: typography.fontSize.sm,
  },
});
