import { combineReducers } from "@reduxjs/toolkit";
import { reducer as roleReducer } from "./roleReducer";
import { reducer as loginReducer } from "./loginReducer";
import { reducer as loadingReducer } from "./loadingReducer";
import { reducer as menuReducer } from "./menuReducer";

const rootReducer = combineReducers({
    role: roleReducer,
    login: loginReducer,
    loading: loadingReducer,
    menu: menuReducer
})

export default rootReducer;