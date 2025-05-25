// import React, { use } from "react";
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   GestureResponderEvent,
// } from "react-native";
// import { useForm } from "../../hooks/common/useForm";
// import { loginSchema } from "../../utils/validation";
// import { FormInput } from "../../components/Form/FormInput";
// import { LAYOUT, SIZE, SPACING } from "../../theme/layout";
// import { colors } from "../../theme/colors";
// import useLogin from "../../hooks/useLogin";
// import { useNavigation } from "@react-navigation/native";

// // import { AuthScreenProps } from '../../navigation/types';



// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const { phone, password, setPassword, setPhone } = useLogin();

//   const onLogin = () => {
//     navigation.navigate("Register");
//   };

//   // navigation.navigate("Register", { test1: "khanh", phone: phone }); // truyen du lieu qua trang khac

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Đăng nhập</Text>
//       </View>

//       <View style={styles.form}>
//         <FormInput
//           label="phone"
//           value={phone}
//           onChangeText={setPhone}
//           placeholder="Nhập email của bạn"
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <FormInput
//           label="password"
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Nhập mật khẩu của bạn"
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.forgotPassword}>
//           <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
//         </TouchableOpacity>

//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>Chưa có tài khoản? </Text>
//           <TouchableOpacity onPress={onLogin}>
//             <Text style={styles.registerLink}>Đăng ký ngay</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
// export default LoginScreen;

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
//     fontSize: SIZE.XXL,
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
//   forgotPassword: {
//     alignSelf: "flex-end",
//     marginBottom: SPACING.L,
//   },
//   forgotPasswordText: {
//     color: colors.blue.main,
//     fontSize: 14,
//   },
//   button: {
//     ...LAYOUT.BUTTON,
//     ...LAYOUT.BUTTON_PRIMARY,
//     backgroundColor: colors.background.default,
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
//   registerContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   registerText: {
//     color: colors.text.secondary,
//     fontSize: 14,
//   },
//   registerLink: {
//     color: colors.blue.main,
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormInput } from "../../components/Form/FormInput";
import { BORDER_RADIUS, LAYOUT, SIZE, SPACING } from "../../theme/layout";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
              style={styles.arrowIcon}
            />
          </View>
        }
        rightIcon={
           (
            <Image
              source={require("@/assets/icons/tick2.png")}
             
            />
          )
        }
      />

      <FormInput
        label="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        placeholder="********"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              source={require("@/assets/icons/eye.png")}
              
            />
          </TouchableOpacity>
        }
      />

      <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
    fontWeight: typography.fontWeight.medium,
  },
  loginButton: {
    backgroundColor: colors.buttun.primary,
    borderRadius: BORDER_RADIUS.M,
    paddingVertical: SPACING.M,
    alignItems: "center",
    marginTop: SPACING.L,
  },
  loginText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
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
  guestText: {
    textAlign: "center",
    color: colors.grey[600],
    textDecorationLine: "underline",
    fontSize: typography.fontSize.sm,
  },
});

