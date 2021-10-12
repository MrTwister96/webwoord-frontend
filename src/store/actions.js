const actions = {
    SET_IDENTITY: "SET_IDENTITY",
    SET_STREAMS: "SET_STREAMS",
    SET_NEW_STREAM: "SET_NEW_STREAM",
};

export const setStreams = (streams) => {
    return {
        type: actions.SET_STREAMS,
        streams,
    };
};

export const setNewStream = (newStream) => {
    return {
        type: actions.SET_NEW_STREAM,
        newStream,
    };
};

export const setIdentity = (identity) => {
    return {
        type: actions.SET_IDENTITY,
        identity,
    };
};

export default actions;
