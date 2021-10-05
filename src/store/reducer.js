import actions from "./actions";

const initialState = {
    identity: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.identity,
            };
        default:
            return state;
    }
};

export default reducer;
