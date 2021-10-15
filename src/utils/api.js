import axios from "axios";

const serverApi = "http://localhost:5001/api";
// const serverApi = "http://192.168.0.114:5001/api";

export const getToken = async (roomData) => {
    const { roomName, identity, host, socketId } = roomData;
    const params = new URLSearchParams([
        ["roomName", roomName],
        ["identity", identity],
        ["host", host],
        ["socketId", socketId],
    ]);
    const response = await axios.get(`${serverApi}/get-token`, { params });
    return response.data;
};
