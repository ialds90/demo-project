import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        removeTodo: (state, action) => {
            return "";
        },
    }
});

export const {addTodo, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;