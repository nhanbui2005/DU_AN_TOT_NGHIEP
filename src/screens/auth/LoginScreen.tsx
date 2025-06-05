import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { FormInput } from "../../components/Form/FormInput";
import { BORDER_RADIUS, SPACING } from "../../theme/layout";
import { colors } from "@/src/theme";
import { typography } from "@/src/theme";
import { assets } from "@/src/theme/assets";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validation";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { AuthNavProp, PageNames } from "../../navigation/types";
import { storageHelper } from "../../config/storage";
import { BASE_URL } from "../../config/axios";
import { resetToMain } from "../../navigation/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    setValues,
  } = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        let deviceId = "";
        if (Platform.OS === "web") {
          deviceId = storageHelper.getOrCreateWebDeviceId();
        } else {
          deviceId = await storageHelper.getOrCreateMobileDeviceId();
        }
        login({
          phone: values.phone,
          password: values.password,
          userAgent: deviceId,
        });
      } catch (error: any) {
        console.log("Login error:", error);
        const message =
          error.response?.data?.message ||
          error.message ||
          "Lỗi không xác định";
        Alert.alert("Đăng nhập thất bại", message);
      }
    },
  });

  useEffect(() => {
    const loadSaveData = async () => {
      try {
        const savephone = await AsyncStorage.getItem("savephone");
        const savepassword = await AsyncStorage.getItem("savepassword");

        if (savephone || savepassword) {
          setValues({
            phone: savephone || "",
            password: savepassword || "",
          });
        }
      } catch (e) {
        console.log("loi dong 103: ", e);
      }
    };
    loadSaveData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <FormInput
        label="Số điện thoại"
        value={values.phone}
        onChangeText={(text: string) => handleChange("phone")(text)}
        onBlur={() => handleBlur("phone")}
        error={touched.phone ? errors.phone : undefined}
        touched={touched.phone}
        keyboardType="phone-pad"
        placeholder="Nhập số điện thoại của bạn"
        leftIcon={
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>+84</Text>
            <Image
              source={require("@/assets/icons/tick.png")}
              style={styles.arrowIcon}
            />
          </View>
        }
      />

      <FormInput
        label="Mật khẩu"
        value={values.password}
        onChangeText={(text: string) => handleChange("password")(text)}
        onBlur={() => handleBlur("password")}
        error={touched.password ? errors.password : undefined}
        touched={touched.password}
        secureTextEntry={secureText}
        placeholder="Nhập mật khẩu của bạn"
        rightIcon={
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              source={require("@/assets/icons/eye.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        }
      />

      <TouchableOpacity
        style={styles.forgot}
        onPress={() => authNav.navigate(PageNames.ForgotPassword)}
      >
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, isSubmitting && styles.buttonDisabled]}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        <Text style={styles.loginText}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => authNav.navigate(PageNames.Register)}>
          <Text style={styles.signupLink}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>hoặc</Text>

      <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
        <Image source={assets.images.Google} style={styles.socialIcon} />
        <Text style={styles.socialText}>Tiếp tục với Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={assets.images.Apple} style={styles.socialIcon} />
        <Text style={styles.socialText}>Tiếp tục với Apple</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>hoặc</Text>

      <TouchableOpacity>
        <Text style={styles.guestText}>Tiếp tục với tư cách khách</Text>
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
