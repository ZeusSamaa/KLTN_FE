import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    fullLoading: true,
    navbarLoading: false,
};

const loadingSlice = createSlice({
    initialState: INIT_STATE,
    name: 'loading',
    reducers: {
        setLoading(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export const { actions, reducer } = loadingSlice;
export const { setLoading } = actions