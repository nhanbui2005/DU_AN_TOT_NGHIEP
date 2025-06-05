import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import { FormInput } from "../../components/Form/FormInput";
import { BORDER_RADIUS, SPACING } from "../../theme/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../utils/validation";
import authApi from "../../api/auth";
import { AuthNavProp, PageNames } from "@/src/navigation/types";


const ForgotPassword = () => {
  const authNav = useNavigation<AuthNavProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await authApi.forgotPassword(values);
        authNav.navigate(PageNames.Verify, {phone: values.phone})
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to send OTP. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => authNav.goBack()}>
        <Image source={require("@/assets/icons/Vector9.png")} />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot</Text>

      <Image
        source={require("@/assets/icons/demo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.header}>Forgot Password?</Text>
      <Text style={styles.description}>
        Don't worry! it happens. Please enter phone number associated with your
        account
      </Text>

      <FormInput
        label="Enter your mobile number"
        value={values.phone}
        onChangeText={(text: string) => handleChange("phone")(text)}
        onBlur={() => handleBlur("phone")}
        error={touched.phone ? errors.phone : undefined}
        keyboardType="phone-pad"
        placeholder="458-465-6466"
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

      <TouchableOpacity 
        style={[styles.otpButton, isSubmitting && styles.buttonDisabled]}
        // onPress={() => handleSubmit()}
        onPress={() => authNav.navigate(PageNames.Verify, {phone: values.phone})}
        disabled={isSubmitting}
      >
        <Text style={styles.otpText}>
          {isSubmitting ? "Sending OTP..." : "Get OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

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
  },
  otpButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  otpText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: "700",
  },
});
