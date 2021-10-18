import React from "react";
// eslint-disable-next-line
import { MdVolumeUp, MdLiveTv } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { getListenerToken } from "../../utils/api";
import * as pokemon from "pokemon";
import { connect } from "react-redux";
import { setActiveRoom } from "../../store/actions";

const Room = ({
    setActiveRoom,
    roomName,
    roomHost,
    prediker,
    beskrywing,
    listenerCount,
}) => {
    let history = useHistory();

    const handleJoinStream = async () => {
        let room = {
            roomName: roomName,
            identity: pokemon.random("en"),
            isHost: false,
            roomHost: roomHost,
            prediker: prediker,
            beskrywing: beskrywing,
        };
        const response = await getListenerToken(room);

        room = {
            ...room,
            token: response.token,
        };

        setActiveRoom(room);

        history.push(`/room`);
    };

    return (
        <button
            onClick={handleJoinStream}
            className="flex items-center w-11/12 md:w-3/5 lg:w-2/5 py-2 bg-gray-800 bg-opacity-80 justify-between rounded-lg hover:bg-gray-700 hover:bg-opacity-60 outline-none focus:ring-4 focus:ring-secondary"
        >
            <div className="flex flex-auto flex-col ml-5 truncate">
                <p className="flex mb-1 text-white font-bold">{roomHost}</p>
                <p className="flex ml-5 text-white text-opacity-60 font-bold">
                    {prediker}
                </p>
                <p className="flex ml-5 text-white text-opacity-60 font-bold">
                    {beskrywing}
                </p>
            </div>
            <div className="flex flex-auto h-full mr-5 justify-end items-center space-x-3">
                <MdVolumeUp color="white" size="25" />
                {/* <MdLiveTv color="white" size="25" /> */}
                <div className="flex space-x-1 ">
                    <div className="h-5 w-5 mt-1 bg-red-600 rounded-xl animate-pulse"></div>
                    <p className="text-white font-bold">{listenerCount}</p>
                </div>
            </div>
        </button>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setActiveRoom: (room) => dispatch(setActiveRoom(room)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Room);
