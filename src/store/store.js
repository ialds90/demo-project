import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./todoSlice";
import userReducer from "./userSlice";


//create store
const store = configureStore({
    reducer: {
        todos : todoReducer,
        user: userReducer
    }
});

export default store;

