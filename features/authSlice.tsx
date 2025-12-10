 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: "anonymous"
}
const authSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers:{
            login(state, action){
                state.isLoggedIn = true
                state.username = action.payload
            },
            logout(state){
                state.isLoggedIn = false;
                state.username = "anonymous"
            }
        }
    }
)

export const {login, logout} = authSlice.actions
export default authSlice.reducer 