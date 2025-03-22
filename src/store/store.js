import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./todoSlice";


//create store
const store = configureStore({
    reducer: {
        todos : todoReducer
    }
});

export default store;

