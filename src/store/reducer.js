import actions from "./actions";

const initialState = {
    identity: null,
    leaveRoom: false,
    rooms: null,
    newRoom: {
        roomName: "",
        roomHost: "",
        roomHostSocketId: "",
        isHost: true,
        prediker: "",
        beskrywing: "",
        deviceId: "",
    },
    activeRoom: {
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
        case actions.SET_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
            };
        case actions.SET_NEW_ROOM:
            return {
                ...state,
                newRoom: action.newRoom,
            };
        case actions.SET_ACTIVE_ROOM:
            return {
                ...state,
                activeRoom: action.activeRoom,
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
