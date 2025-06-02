import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth";

let store = configureStore({
    reducer: {
        authReducer 
    }
})

export default store