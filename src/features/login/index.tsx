import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CContainer, CForm, CFormInput } from "@coreui/react";
import { useMutation, useQuery } from "react-query";
import { api } from "../../api";
import { LoadingButton } from "../../components/Buttons";
import { useNavigate } from "react-router";
import "./styles.scss";
const LoginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(/^[\w-\.]+@([\w-]+\.)+([\w-])+/, "Invalid email")
    .required("Email required"),
  password: yup
    .string()
    .matches(/[\w-]*[A-Z]+[\w-]*/, "Minimum 1 Uppercase letter")
    .required("Password required")
    .min(8, "Minimum 8 characters"),
});
export const LoginPage = () => {
  const navigate = useNavigate();
  const { data, mutate, isLoading } = useMutation<
    any,
    any,
    { email: string; password: string }
  >({
    mutationKey: ["user"],
    mutationFn: (data) => api.user.login(data),
    onSuccess: () => {
      navigate("/");
    },
  });
  const { values, errors, touched, submitForm, setFieldValue, submitCount } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (data) => {
        mutate(data);
      },

      validationSchema: LoginSchema,
      validateOnMount: true,
    });
  return (
    <CContainer className={"login"}>
      <CForm
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <CFormInput
          disabled={isLoading}
          value={values.email}
          onChange={({ target: { value } }) => {
            setFieldValue("email", value);
          }}
          valid={!errors.email}
          invalid={!!(submitCount && errors.email)}
          label="Email address"
          placeholder="name@example.com"
          text={!!submitCount && errors.email}
        />
        <CFormInput
          disabled={isLoading}
          value={values.password}
          onChange={({ target: { value } }) => {
            setFieldValue("password", value.trim());
          }}
          type="password"
          label="Password"
          valid={!errors.password}
          invalid={!!(submitCount && errors.password)}
          text={!!submitCount && errors.password}
        />
        <LoadingButton
          isLoading={isLoading}
          type={"submit"}
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          title={"Login"}
        >
          Login
        </LoadingButton>
      </CForm>
    </CContainer>
  );
};
