import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { BORDER_RADIUS, SPACING } from "../../theme/layout";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";
import { useFormik } from "formik";
import { verifyOTPSchema } from "../../utils/validation";
import authApi from "../../api/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import { FormInput } from "../../components/Form/FormInput";

type VerifyScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Verify">;
type VerifyScreenRouteProp = RouteProp<AuthStackParamList, "Verify">;

const Verify: React.FC = () => {
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const route = useRoute<VerifyScreenRouteProp>();
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
      otp: "",
    },
    validationSchema: verifyOTPSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await authApi.verifyOTP({
          phone: route.params.phone,
          otp: values.otp,
        });
        navigation.navigate("ResetPassword", {
          phone: route.params.phone,
          otp: values.otp,
        });
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Invalid OTP. Please try again."
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

      <Text style={styles.title}>Verify</Text>

      <Image
        source={require("@/assets/icons/demo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.header}>Verify OTP</Text>
      <Text style={styles.description}>
        Please enter the OTP sent to your phone number
      </Text>

      <FormInput
        label="Enter OTP"
        value={values.otp}
        onChangeText={(text: string) => handleChange("otp")(text)}
        onBlur={() => handleBlur("otp")}
        error={touched.otp ? errors.otp : undefined}
        keyboardType="numeric"
        placeholder="Enter 6-digit OTP"
        maxLength={6}
      />

      <TouchableOpacity 
        style={[styles.verifyButton, isSubmitting && styles.buttonDisabled]}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        <Text style={styles.verifyText}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.resendButton}
        onPress={async () => {
          try {
            await authApi.forgotPassword({ phone: route.params.phone });
            Alert.alert("Success", "OTP has been resent to your phone number");
          } catch (error: any) {
            Alert.alert(
              "Error",
              error.response?.data?.message || "Failed to resend OTP. Please try again."
            );
          }
        }}
      >
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verify;

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
  verifyButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  verifyText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: "700",
  },
  resendButton: {
    marginTop: SPACING.M,
    alignItems: "center",
  },
  resendText: {
    color: colors.buttun.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: "500",
  },
}); 