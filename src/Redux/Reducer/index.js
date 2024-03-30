import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../Slice/authSlice";
import userReducer from "../Slice/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  UserDetails: userReducer,
});

export default rootReducer;
