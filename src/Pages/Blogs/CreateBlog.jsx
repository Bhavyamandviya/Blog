// import React from "react";
// import {
//   CustomButton,
//   CustomInput,
// } from "../../Component/CustomForms/CustomForm";
import * as Yup from "yup";
// import { Formik } from "formik";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import toast from "react-hot-toast";

// const CreateBlog = () => {
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);

//   const handleSubmit = async (value) => {
//     console.log(value);
//     await axios
//       .post(
//         "http://localhost:4001/api/blogs/createBlog",
//         {
//           title: value.title,
//           category: value.category,
//           description: value.description,
//           tags: value.tags,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass token in the Authorization header
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         toast.success("Blog Created Successfully");
//         navigate("/");
//       })
//       .catch((error) => console.log(error));
//   };

//   <>
//     <div style={{ paddingTop: "70px" }}></div>

//     <div>Heelo</div>
//   </>;
// };

// export default CreateBlog;
import { Formik } from "formik";
import React from "react";

import {
  CustomButton,
  CustomInput,
} from "../../Component/CustomForms/CustomForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const initialvalue = {
  title: "",
  description: "",
  tags: "",
  category: "",
};
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.string().required(),
});
const CreateBlog = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values);

    await axios
      .post(
        "http://localhost:4001/api/blogs/createBlog",
        {
          title: values.title,
          category: values.category,
          description: values.description,
          tags: values.tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      )
      .then((res) => {
        console.log(res);

        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="container pt-5 pb-5">
        <h1 style={{ textAlign: "center" }}>Create A Blog</h1>
        <div
          style={{
            width: "450px",
            margin: "auto",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Formik
            initialValues={initialvalue}
            validationSchema={ValidationSchema}
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
                className="row pt-3"
              >
                <CustomInput
                  err={errors.title}
                  type="title"
                  isInvalid={!!touched.title && !!errors.title}
                  label={"title"}
                  name="title"
                  onChange={handleChange}
                  placeholder="Enter Your title"
                  value={values.title}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomInput
                  err={errors.description}
                  type="description"
                  isInvalid={!!touched.description && !!errors.description}
                  label={"description "}
                  name="description"
                  onChange={handleChange}
                  placeholder="Enter Your description "
                  value={values.description}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomInput
                  err={errors.category}
                  type="category"
                  isInvalid={!!touched.category && !!errors.category}
                  label={"category "}
                  name="category"
                  onChange={handleChange}
                  placeholder="Enter Your category"
                  value={values.category}
                  isRequired={true}
                  lg={12}
                  md={12}
                />

                <CustomInput
                  err={errors.tags}
                  type="tags"
                  isInvalid={!!touched.tags && !!errors.tags}
                  label={"tags"}
                  name="tags"
                  onChange={handleChange}
                  placeholder="Enter Your tags"
                  value={values.tags}
                  isRequired={true}
                  lg={12}
                  md={12}
                />
                <CustomButton
                  isSubmitting={isSubmitting}
                  className="w-100 mt-3"
                  lg="12"
                  md="12"
                  label="Submit"
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
