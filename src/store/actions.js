const actions = {
    SET_IDENTITY: "SET_IDENTITY",
};

export const setIdentity = (identity) => {
    return {
        type: actions.SET_IDENTITY,
        identity,
    };
};

export default actions;
