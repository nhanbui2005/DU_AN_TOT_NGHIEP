import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { FormInput } from "../../components/Form/FormInput";
import { BORDER_RADIUS, SPACING } from "../../theme/layout";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validation";
import authApi from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { AuthNavProp, PageNames } from "../../navigation/types";

const LoginScreen = () => {
  const authNav = useNavigation<AuthNavProp>();
  const [secureText, setSecureText] = useState(true);
  const { login } = useAuth();

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
      phone: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await authApi.login(values);
        login(response.token);
        authNav.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      } catch (error: any) {
        Alert.alert(
          "Login Failed",
          error.response?.data?.message || "Please check your credentials and try again"
        );
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <FormInput
        label="Enter your mobile number"
        value={values.phone}
        onChangeText={(text: string) => handleChange("phone")(text)}
        onBlur={() => handleBlur("phone")}
        error={touched.phone ? errors.phone : undefined}
        keyboardType="phone-pad"
        placeholder="1712345678"
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
        label="Enter your password"
        value={values.password}
        onChangeText={(text: string) => handleChange("password")(text)}
        onBlur={() => handleBlur("password")}
        error={touched.password ? errors.password : undefined}
        secureTextEntry={secureText}
        placeholder="********"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              source={require("@/assets/icons/eye.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        }
      />

      <TouchableOpacity style={styles.forgot} onPress={() => authNav.navigate(PageNames.ForgotPassword)}>
        <Text style={styles.forgotText}>forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.loginButton, isSubmitting && styles.buttonDisabled]}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        <Text style={styles.loginText}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => authNav.navigate(PageNames.Register)}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={assets.images.Google}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={assets.images.Apple}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: SPACING.L,
    justifyContent: "center",
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
  forgot: {
    alignSelf: "flex-end",
    marginTop: SPACING.S,
  },
  forgotText: {
    color: colors.grey[800],
    fontSize: typography.fontSize.sm,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: "700",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: SPACING.M,
  },
  signupText: {
    color: colors.grey[600],
    fontSize: typography.fontSize.sm,
  },
  signupLink: {
    color: colors.black,
    fontWeight: "700",
    fontSize: typography.fontSize.sm,
  },
  orText: {
    textAlign: "center",
    color: colors.grey[600],
    marginVertical: SPACING.M,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey[600],
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    justifyContent: "center",
    marginVertical: SPACING.S,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: SPACING.S,
  },
  socialText: {
    fontSize: typography.fontSize.md,
    fontWeight: "500",
  },
  guestText: {
    textAlign: "center",
    color: colors.grey[600],
    textDecorationLine: "underline",
    fontSize: typography.fontSize.sm,
  },
});

