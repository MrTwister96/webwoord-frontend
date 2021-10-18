import axios from "axios";

// const serverApi = "http://192.168.8.102:5001/api";
const serverApi = "https://boiling-caverns-36417.herokuapp.com/api";

export const getToken = async (room) => {
    const {
        roomName,
        roomHost,
        roomHostSocketId,
        isHost,
        prediker,
        beskrywing,
    } = room;

    const params = new URLSearchParams([
        ["roomName", roomName],
        ["roomHost", roomHost],
        ["roomHostSocketId", roomHostSocketId],
        ["isHost", isHost],
        ["prediker", prediker],
        ["beskrywing", beskrywing],
    ]);

    const response = await axios.get(`${serverApi}/get-token`, { params });
    return response.data;
};

export const getListenerToken = async (room) => {
    const { roomName, identity, host } = room;

    const params = new URLSearchParams([
        ["roomName", roomName],
        ["identity", identity],
        ["host", host],
    ]);

    const response = await axios.get(`${serverApi}/get-listener-token`, {
        params,
    });
    return response.data;
};
