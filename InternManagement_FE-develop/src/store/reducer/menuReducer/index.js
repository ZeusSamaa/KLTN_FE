import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    selectedMenuItemIndex: 0,
};

const menuSlice = createSlice({
    initialState: INIT_STATE,
    name: 'menu',
    reducers: {
        setSelectedMenuItemIndex(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export const { actions, reducer } = menuSlice;
export const { setSelectedMenuItemIndex } = actions