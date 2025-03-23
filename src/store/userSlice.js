import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        removeUser: (state, action) => {
            return "";
        },
    }
});

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;