import axios from "axios";

// const serverApi = "http://192.168.8.102:5001/api";
const serverApi = "https://agile-chamber-55425.herokuapp.com/api";

export const getToken = async (room) => {
    const { roomName, identity, isHost } = room;

    let params;

    if (isHost) {
        const { roomHostSocketId, prediker, beskrywing } = room;

        params = new URLSearchParams([
            ["roomName", roomName],
            ["identity", identity],
            ["roomHostSocketId", roomHostSocketId],
            ["isHost", isHost],
            ["prediker", prediker],
            ["beskrywing", beskrywing],
        ]);
    } else {
        params = new URLSearchParams([
            ["roomName", roomName],
            ["identity", identity],
            ["isHost", isHost],
        ]);
    }

    const response = await axios.get(`${serverApi}/get-token`, { params });
    return response.data;
};
