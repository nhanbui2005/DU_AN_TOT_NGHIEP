import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { FormInput } from "../../components/Form/FormInput";
import { BORDER_RADIUS, SIZE, SPACING } from "../../theme/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
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
        Don’t worry! it happens. Please enter phone number associated with your
        account
      </Text>

      <FormInput
        label="Enter your mobile number"
        value={phone}
        onChangeText={setPhone}
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
        rightIcon={<Image source={require("@/assets/icons/tick2.png")} />}
      />

      <TouchableOpacity style={styles.otpButton} onPress={() => navigation.navigate("Verify")}>
        <Text style={styles.otpText}>Get OTP</Text>
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
    fontWeight: typography.fontWeight.bold,
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
    fontWeight: typography.fontWeight.bold,
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
  otpText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
});
