import React from "react";
import {
  CustomButton,
  CustomInput,
  CustomInputPassword,
} from "../../Component/CustomForms/CustomForm";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData, setToken } from "../../Redux/Slice/authSlice";
import { setUser } from "../../Redux/Slice/userSlice";
const initialvalue = {
  email: "",
  password: "",
};
const LoginSchema = Yup.object().shape({
  password: Yup.string().required(),
  email: Yup.string().email("Invalid email").required("Email is Required"),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    await axios
      .post("http://localhost:4001/api/auth/login", {
        email: value.email,
        password: value.password,
      })
      .then((res) => {
        console.log(res);
        dispatch(setSignupData(res.data.data));
        dispatch(setToken(res.data.data.token));
        dispatch(setUser(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div style={{ paddingTop: "70px" }}></div>

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
          <h2 style={{ textAlign: "center" }}> Login </h2>
          <Formik
            initialValues={initialvalue}
            validationSchema={LoginSchema}
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
              <form onSubmit={handleSubmit} onChange={handleChange}>
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
                <CustomInputPassword
                  err={errors.password}
                  handleChange={handleChange}
                  isInvalid={!!touched.password && errors.password}
                  label="Create Password"
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomButton
                  isSubmitting={isSubmitting}
                  className="w-100 mt-3"
                  lg="12"
                  md="12"
                  label="login"
                />
              </form>
            )}
          </Formik>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <p
              style={{ textAlign: "end", fontSize: "18px", fontWeight: "400" }}
            >
              Don't have an account?
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
