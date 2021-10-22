import axios from "axios";

const APISERVER = "https://webwoord-api.ptype.app/api";

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

    const response = await axios.get(`${APISERVER}/get-token`, { params });
    return response.data;
};
