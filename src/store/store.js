import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer/authReducer";

const getSavedAuth = () => {
    const saved = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null
    return saved;
};

const savedAuth = getSavedAuth();

const initialState = {
    auth: {
        jwtToken: savedAuth?.jwtToken || "",
        username: savedAuth?.username || "",
        cardId: savedAuth?.cardId || "",
        roles: savedAuth?.roles || []
    }
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: initialState,
});

export default store;
