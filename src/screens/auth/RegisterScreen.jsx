// import React from "react";
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   ScrollView,
//   GestureResponderEvent,
// } from "react-native";
// import { useForm } from "../../hooks/common/useForm";
// import { registerSchema } from "../../utils/validation";
// import { FormInput } from "../../components/Form/FormInput";
// import { LAYOUT, SPACING } from "../../theme/layout";
// import { colors } from "../../theme/colors";
// import { AuthScreenProps } from "../../navigation/types";

// type RegisterFormValues = {
//   fullName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
// };

// export const RegisterScreen = (props: AuthScreenProps) => {
//   const { navigation, route } = props ?? {};
//   console.debug("route", route);
//   const params = route?.params ?? {};
//   console.debug("params", params);

//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     isSubmitting,
//   } = useForm<RegisterFormValues>({
//     initialValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: registerSchema,
//     onSubmit: (values) => {
//       // TODO: Implement register logic
//       console.log("Register values:", values);
//     },
//   });

//   const handleSubmitPress = (e: GestureResponderEvent) => {
//     e.preventDefault();
//     handleSubmit();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Đăng ký</Text>
//         <Text style={styles.subtitle}>Tạo tài khoản mới</Text>
//       </View>

//       <View style={styles.form}>
//         <FormInput
//           label="Họ và tên"
//           value={values.fullName}
//           onChangeText={handleChange("fullName")}
//           onBlur={() => handleBlur("fullName")}
//           error={errors.fullName}
//           touched={touched.fullName}
//           placeholder="Nhập họ và tên của bạn"
//         />

//         <FormInput
//           label="Email"
//           value={values.email}
//           onChangeText={handleChange("email")}
//           onBlur={() => handleBlur("email")}
//           error={errors.email}
//           touched={touched.email}
//           placeholder="Nhập email của bạn"
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <FormInput
//           label="Số điện thoại"
//           value={values.phone}
//           onChangeText={handleChange("phone")}
//           onBlur={() => handleBlur("phone")}
//           error={errors.phone}
//           touched={touched.phone}
//           placeholder="Nhập số điện thoại của bạn"
//           keyboardType="phone-pad"
//         />

//         <FormInput
//           label="Mật khẩu"
//           value={values.password}
//           onChangeText={handleChange("password")}
//           onBlur={() => handleBlur("password")}
//           error={errors.password}
//           touched={touched.password}
//           placeholder="Nhập mật khẩu của bạn"
//           secureTextEntry
//         />

//         <FormInput
//           label="Xác nhận mật khẩu"
//           value={values.confirmPassword}
//           onChangeText={handleChange("confirmPassword")}
//           onBlur={() => handleBlur("confirmPassword")}
//           error={errors.confirmPassword}
//           touched={touched.confirmPassword}
//           placeholder="Nhập lại mật khẩu của bạn"
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={[styles.button, isSubmitting && styles.buttonDisabled]}
//           onPress={handleSubmitPress}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.buttonText}>
//             {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
//           </Text>
//         </TouchableOpacity>

//         <View style={styles.loginContainer}>
//           <Text style={styles.loginText}>Đã có tài khoản? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <Text style={styles.loginLink}>Đăng nhập</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.default,
//   },
//   header: {
//     padding: SPACING.L,
//     paddingTop: SPACING.XL,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: colors.text.primary,
//     marginBottom: SPACING.XS,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: colors.text.secondary,
//   },
//   form: {
//     padding: SPACING.L,
//   },
//   button: {
//     ...LAYOUT.BUTTON,
//     ...LAYOUT.BUTTON_PRIMARY,
//     marginBottom: SPACING.M,
//   },
//   buttonDisabled: {
//     ...LAYOUT.BUTTON_DISABLED,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   loginContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loginText: {
//     color: colors.text.secondary,
//     fontSize: 14,
//   },
//   loginLink: {
//     color: colors.blue.main,
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });


import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormInput } from "../../components/Form/FormInput";
import { SPACING, SIZE, BORDER_RADIUS } from "../../theme/layout";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <FormInput
        label="Enter your mobile number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="1712345678"
        leftIcon={
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>+91</Text>
            <Image
              source={require("@/assets/icons/tick.png")}
              style={styles.icon}
            />
          </View>
        }
        rightIcon={<Image source={require("@/assets/icons/tick2.png")} />}
      />

      <FormInput
        label="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="abc12@gmail.com"
      />

      <FormInput
        label="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        placeholder="**************"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image source={require("@/assets/icons/eye.png")} />
          </TouchableOpacity>
        }
      />

      <FormInput
        label="Re-Enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureText}
        placeholder="**************"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image source={require("@/assets/icons/eye.png")} />
          </TouchableOpacity>
        }
      />

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signinRow}>
        <Text style={styles.signinText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signinLink}>Sign in</Text>
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
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: SPACING.L,
    justifyContent: "center",
  },
  title: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
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
  icon: {
    width: 12,
    height: 8,
    marginLeft: SPACING.XS,
  },
  signUpButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  signUpText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  signinRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: SPACING.M,
  },
  signinText: {
    color: colors.grey[600],
    fontSize: typography.fontSize.sm,
  },
  signinLink: {
    color: colors.black,
    fontWeight: "bold",
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
    fontWeight: typography.fontWeight.medium,
  },
});
