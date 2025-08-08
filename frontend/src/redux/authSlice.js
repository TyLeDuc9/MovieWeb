import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            success: false,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logout: (state) => {
            state.login.currentUser = null;
            state.login.isFetching = false;
            state.login.error = false;
            localStorage.removeItem('user');
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        updateUserStart: (state) => {
            state.login.isFetching = true;
        },
        updateUserSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = {
                ...state.login.currentUser,
                user: action.payload, 
            };
            state.login.error = false;
        },
        updateFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        }
    }
});

export const { loginStart, loginSuccess, loginFailed, logout,
    registerStart, registerSuccess, registerFailed,
    updateUserStart, updateUserSuccess, updateFailed, } = authSlice.actions;
export default authSlice.reducer;
