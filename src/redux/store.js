import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userSlice from "./Slice";

const reducer = combineReducers({
    usersState: userSlice
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store