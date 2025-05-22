import { useFormik } from 'formik';
import { FormikConfig, FormikValues } from 'formik';

export const useForm = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  ...rest
}: FormikConfig<T>) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    ...rest,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched, resetForm } = formik;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    isValid: formik.isValid,
    isSubmitting: formik.isSubmitting,
  };
}; 