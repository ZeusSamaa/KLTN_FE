import { ROLE } from "@/constant/role";
import { createSlice } from "@reduxjs/toolkit";

const INIT_ROLE_STATE = ROLE.UNLOGINED;

const roleSlice = createSlice({
    initialState: INIT_ROLE_STATE,
    name: 'role',
    reducers: {
        setRole(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export const { actions, reducer } = roleSlice;
export const { setRole } = actions;