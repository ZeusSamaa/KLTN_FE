import { createSlice } from "@reduxjs/toolkit";

const INIT_LOGIN_STATE = false;

const loginSlice = createSlice({
    initialState: INIT_LOGIN_STATE,
    name: 'login',
    reducers: {
        setLogin(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export const { actions, reducer } = loginSlice;
export const { setLogin } = actions