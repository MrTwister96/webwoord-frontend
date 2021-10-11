import axios from "axios";

const serverApi = "http://localhost:5001/api";

export const getToken = async (roomData) => {
    const { roomName, identity, host } = roomData;
    const params = new URLSearchParams([
        ["roomName", roomName],
        ["identity", identity],
        ["host", host],
    ]);
    const response = await axios.get(`${serverApi}/get-token`, { params });
    return response.data;
};
