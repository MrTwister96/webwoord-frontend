import actions from "./actions";

const initialState = {
    identity: "",
    streams: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.identity,
            };
        case actions.SET_STREAMS:
            return {
                ...state,
                streams: action.streams,
            };
        default:
            return state;
    }
};

export default reducer;
