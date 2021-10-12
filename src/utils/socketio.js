import io from "socket.io-client";
import store from "../store/store";
import { setStreams } from "../store/actions";

// const SERVER = "http://192.168.0.114:5001";
const SERVER = "http://localhost:5001";

let socket = null;

const connectToSocketIoServer = () => {
    socket = io(SERVER);

    socket.on("connect", () => {
        console.log(`Connected to Socket.IO server: ${socket.id}`);
    });

    socket.on("all-streams", (streams) => {
        store.dispatch(setStreams(streams));
    });
};

export { connectToSocketIoServer };
