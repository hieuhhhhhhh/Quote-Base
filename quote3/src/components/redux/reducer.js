import { SET_USERNAME } from "./action"

const initialState = {
    username: "",
}

const usernameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload, // Updates username
            };
        default:
            return state;
    }
};

export default usernameReducer;