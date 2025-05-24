import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { BORDER_RADIUS, SIZE, SPACING } from "../../theme/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";


const Verify = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => {
        navigation.goBack();
      }} >
        <Image source={require("@/assets/icons/Vector9.png")} />
      </TouchableOpacity>

      <Text style={styles.title}>Verify</Text>

      <Image
        source={require("@/assets/icons/demo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.header}>Enter OTP</Text>
      <Text style={styles.description}>An 4 digit OTP has been sent to </Text>
      <Text style={styles.bold}>458-465-6466</Text>

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value=""
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            editable={false}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>Resend OTP (00:12)</Text>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: SPACING.L,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: -26,
    marginTop: SPACING.M,
  },
  title: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.S,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.grey[600],
    textAlign: "center",
    marginBottom: SPACING.S,
  },
  bold: {
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
    marginBottom: SPACING.XL,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: SPACING.L,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderRadius: BORDER_RADIUS.M,
    borderWidth: 1,
    borderColor: colors.grey[600],
    fontSize: typography.fontSize["2xl"],
  },
  verifyButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    width: "100%",
    marginBottom: SPACING.M,
  },
  verifyText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  resendText: {
    color: colors.grey[600],
    fontSize: typography.fontSize.md,
  },
});
