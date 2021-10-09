const actions = {
    SET_IDENTITY: "SET_IDENTITY",
    SET_STREAMS: "SET_STREAMS",
};

export const setStreams = (streams) => {
    return {
        type: actions.SET_STREAMS,
        streams,
    };
};

export const setIdentity = (identity) => {
    return {
        type: actions.SET_IDENTITY,
        identity,
    };
};

export default actions;
