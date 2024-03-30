import React from "react";
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
} from "../../Component/CustomForms/CustomForm";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData, setToken } from "../../Redux/Slice/authSlice";
import { setUser } from "../../Redux/Slice/userSlice";
const initialvalue = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};
const SignupSchema = Yup.object().shape({
  password: Yup.string().required(),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
  name: Yup.string().required(),
});
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    console.log(value);
    await axios
      .post("http://localhost:4001/api/auth/signup", {
        email: value.email,
        name: value.name,
        password: value.password,
      })
      .then((res) => {
        console.log(res);
        dispatch(setSignupData(res.data.data));
        dispatch(setToken(res.data.data.token));
        dispatch(setUser(res.data.data));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div style={{ paddingTop: "40px" }}></div>

      <div className="container">
        <div
          style={{
            width: "450px",
            margin: "auto",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}> Create a new account </h2>
          <Formik
            initialValues={initialvalue}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="pt-3"
              >
                <CustomInput
                  err={errors.email}
                  type="email"
                  isInvalid={!!touched.email && !!errors.email}
                  label={"email address"}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Your email address"
                  value={values.email}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomInput
                  err={errors.name}
                  type="name"
                  isInvalid={!!touched.name && !!errors.name}
                  label={"name"}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Your name"
                  value={values.name}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomInputPassword
                  err={errors.password}
                  handleChange={handleChange}
                  isInvalid={!!touched.password && errors.password}
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomInputPassword
                  err={errors.confirmPassword}
                  handleChange={handleChange}
                  isInvalid={
                    !!touched.confirmPassword && errors.confirmPassword
                  }
                  label="Re-Enter Password"
                  name="confirmPassword"
                  placeholder="Re-Enter Password"
                  value={values.confirmPassword}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomButton
                  isSubmitting={isSubmitting}
                  className="w-100 mt-3"
                  lg="12"
                  md="12"
                  label="signup"
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div style={{ paddingTop: "40px" }}></div>
    </>
  );
};

export default Signup;
