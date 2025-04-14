import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; // adjust path if neededimport authReducer from "./authSlice"; // adjust path if needed
const store = configureStore({
    reducer :{
        auth : authReducer
        
    }
});


export default store;    