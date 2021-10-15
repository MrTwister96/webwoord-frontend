import actions from "./actions";

const initialState = {
    identity: "",
    leaveRoom: false,
    streams: [],
    newRoom: {
        roomName: "",
        roomHost: "",
        roomHostSocketId: "",
        isHost: true,
        prediker: "",
        beskrywing: "",
        deviceId: "",
    },
    room: {
        isHost: false,
        token: null,
        roomName: null,
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
        case actions.SET_NEW_ROOM:
            return {
                ...state,
                newRoom: action.newRoom,
            };
        case actions.SET_ROOM:
            return {
                ...state,
                room: action.room,
            };
        case actions.SET_LEAVE_ROOM:
            return {
                ...state,
                leaveRoom: action.leaveRoom,
            };
        default:
            return state;
    }
};

export default reducer;
