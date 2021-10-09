import actions from "./actions";

const initialState = {
    identity: "",
    streams: [
        {
            streamer: "EG Kerk Maranata",
            speaker: "Ds Willie Olivier",
            description: "Die Nagmal - 1 Kor 11:27",
            listeners: 39,
        },
        {
            streamer: "EG Kerk Pretoria Oos",
            speaker: "Ds Andre Bester",
            description: "Verbly jouself - Fil 4:4",
            listeners: 27,
        },
        {
            streamer: "EG Kerk Benoni",
            speaker: "Ds Gerhard Beukes",
            description: "Die Wonderlike Skepping - Gen 1",
            listeners: 32,
        },
        {
            streamer: "EG Kerk Kempton Park",
            speaker: "Ds Paul Grobbelaar",
            description: "Loof die Here - Ps 102",
            listeners: 18,
        },
        {
            streamer: "EG Kerk Wonderboom",
            speaker: "Ds Jurgens Prinsloo",
            description: "Die Here is my Herder - Ps 23",
            listeners: 22,
        },
    ],
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
