import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreateBlog from "./Pages/Blogs/CreateBlog";
import Login from "./Pages/Auth/Login";

import Signup from "./Pages/Auth/Signup";
import PrivateRoute from "./Component/PrivateRoute";

const NavigationRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBlog" element={<CreateBlog />} />

        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute>
              <Signup />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default NavigationRoute;
