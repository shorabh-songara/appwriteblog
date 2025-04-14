import { createSlice } from "@reduxjs/toolkit";
import React from "react";
const initialState = { 
    status : false,
    userData : null,
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    //reducers ak object hai 
    reducers : {
        login : (state , action)=>{
            state.status = true;
            state.userData = action.payload;
        },

        logout : (state , action) => {
            state.status = false;
            state.userData = null;
        }
    }
});
export const {login , logout}= authSlice.actions;
export default authSlice.reducer;