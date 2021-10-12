import actions from "./actions";

const initialState = {
    identity: "",
    streams: [],
    newStream: {
        kerkNaam: "",
        prediker: "",
        beskrywing: "",
        deviceId: "",
    },
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
        case actions.SET_NEW_STREAM:
            return {
                ...state,
                newStream: action.newStream,
            };
        default:
            return state;
    }
};

export default reducer;
