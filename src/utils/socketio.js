import io from "socket.io-client";
import store from "../store/store";
import { setIdentity, setLeaveRoom, setRooms } from "../store/actions";

// const SERVER = "http://192.168.0.114:5001";
const SERVER = "http://localhost:5001";

let socket = null;

const connectToSocketIoServer = () => {
    socket = io(SERVER);

    socket.on("connect", () => {
        console.log(`Connected to Socket.IO server: ${socket.id}`);
        store.dispatch(setIdentity(socket.id));
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
