import * as Yup from 'yup';

const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^[0-9]{10}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

const messages = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  password: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số',
  minLength: (field: string, length: number) => `${field} phải có ít nhất ${length} ký tự`,
  maxLength: (field: string, length: number) => `${field} không được vượt quá ${length} ký tự`,
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required(messages.required)
    .matches(patterns.email, messages.email),
  password: Yup.string()
    .required(messages.required)
    .matches(patterns.password, messages.password),
});

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(messages.required)
    .min(2, messages.minLength('Họ tên', 2))
    .max(50, messages.maxLength('Họ tên', 50)),
  email: Yup.string()
    .required(messages.required)
    .matches(patterns.email, messages.email),
  phone: Yup.string()
    .required(messages.required)
    .matches(patterns.phone, messages.phone),
  password: Yup.string()
    .required(messages.required)
    .matches(patterns.password, messages.password),
  confirmPassword: Yup.string()
    .required(messages.required)
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
});

// Profile form validation
export const profileSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(messages.required)
    .min(2, messages.minLength('Họ tên', 2))
    .max(50, messages.maxLength('Họ tên', 50)),
  email: Yup.string()
    .required(messages.required)
    .matches(patterns.email, messages.email),
  phone: Yup.string()
    .required(messages.required)
    .matches(patterns.phone, messages.phone),
  address: Yup.string()
    .required(messages.required)
    .min(5, messages.minLength('Địa chỉ', 5)),
});

// Change password validation
export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required(messages.required),
  newPassword: Yup.string()
    .required(messages.required)
    .matches(patterns.password, messages.password),
  confirmPassword: Yup.string()
    .required(messages.required)
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp'),
}); 