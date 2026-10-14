const initialState = {
    jwtToken: "",
    username: "",
    cardId: "",
    roles: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                jwtToken: action.payload?.jwtToken,
                username: action.payload?.username,
                cardId: action.payload?.cardId,
                roles: action.payload?.roles
            }
        }

        case "LOGOUT": {
            return {
                ...state,
                jwtToken: "",
                username: "",
                cardId: "",
                roles: []
            }
        }
        default:
            return state;
    }
}