const actions = {
    SET_IDENTITY: "SET_IDENTITY",
    SET_ROOMS: "SET_ROOMS",
    SET_NEW_ROOM: "SET_NEW_ROOM",
    SET_ACTIVE_ROOM: "SET_ACTIVE_ROOM",
    SET_LEAVE_ROOM: "SET_LEAVE_ROOM",
};

export const setRooms = (rooms) => {
    return {
        type: actions.SET_ROOMS,
        rooms,
    };
};

export const setNewRoom = (newRoom) => {
    return {
        type: actions.SET_NEW_ROOM,
        newRoom,
    };
};

export const setActiveRoom = (activeRoom) => {
    return {
        type: actions.SET_ACTIVE_ROOM,
        activeRoom,
    };
};

export const setIdentity = (identity) => {
    return {
        type: actions.SET_IDENTITY,
        identity,
    };
};

export const setLeaveRoom = (leaveRoom) => {
    return {
        type: actions.SET_LEAVE_ROOM,
        leaveRoom,
    };
};

export default actions;
