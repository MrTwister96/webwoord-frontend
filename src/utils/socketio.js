import io from "socket.io-client";
import store from "../store/store";
import { setLeaveRoom, setRooms, setSocket } from "../store/actions";

const APISERVER = "https://webwoord-api-fqdn-here";

let socket = null;

const connectToSocketIoServer = () => {
    socket = io(APISERVER, {
        withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd",
        },
    });

    socket.on("connect", () => {
        console.info(`Connected to Socket.IO server: ${socket.id}`);
        store.dispatch(setSocket(socket.id));
    });

    socket.on("update-rooms", (rooms) => {
        store.dispatch(setRooms(rooms));
    });

    socket.on("leave-room", () => {
        console.log("Leaving Room");
        store.dispatch(setLeaveRoom(true));
    });
};

const joinRoom = (roomName) => {
    socket.emit("join-room", roomName);
};

export { connectToSocketIoServer, joinRoom };
