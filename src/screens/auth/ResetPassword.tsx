import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import { FormInput } from "../../components/Form/FormInput";
import { BORDER_RADIUS, SPACING } from "../../theme/layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../utils/validation";
import authApi from "../../api/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import { RouteProp } from "@react-navigation/native";

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "ResetPassword">;
type ResetPasswordScreenRouteProp = RouteProp<AuthStackParamList, "ResetPassword">;

const ResetPassword = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const route = useRoute<ResetPasswordScreenRouteProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await authApi.resetPassword({
          phone: route.params.phone,
          otp: route.params.otp,
          newPassword: values.newPassword,
        });
        Alert.alert(
          "Success",
          "Your password has been reset successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to reset password. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require("@/assets/icons/Vector9.png")} />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>

      <Image
        source={require("@/assets/icons/demo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.header}>Create New Password</Text>
      <Text style={styles.description}>
        Your new password must be different from previously used passwords
      </Text>

      <FormInput
        label="New Password"
        value={values.newPassword}
        onChangeText={(text: string) => handleChange("newPassword")(text)}
        onBlur={() => handleBlur("newPassword")}
        error={touched.newPassword ? errors.newPassword : undefined}
        secureTextEntry={secureText}
        placeholder="Enter new password"
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
        placeholder="Confirm new password"
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
        style={[styles.resetButton, isSubmitting && styles.buttonDisabled]}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        <Text style={styles.resetText}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: SPACING.L,
  },
  backButton: {
    marginBottom: -26,
    marginTop: SPACING.M,
  },
  title: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: SPACING.L,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: SPACING.XXL,
    marginTop: SPACING.XXL,
  },
  header: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: "700",
    textAlign: "center",
    marginBottom: SPACING.M,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.grey[600],
    textAlign: "center",
    marginBottom: SPACING.XL,
    lineHeight: 20,
  },
  icon: {
    width: 23,
    height: 15,
    tintColor: colors.black,
  },
  resetButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  resetText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: "700",
  },
}); 