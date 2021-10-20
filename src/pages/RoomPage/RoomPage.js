import React, { useEffect } from "react";
import { AudioRenderer, useParticipant, useRoom } from "livekit-react";
import { createLocalAudioTrack } from "livekit-client";
import { useHistory } from "react-router-dom";
import { connect as connectRedux } from "react-redux";
import { joinRoom } from "../../utils/socketio";

const RoomPage = ({ leaveRoom, activeRoom, newRoom }) => {
    let history = useHistory();
    const { isHost, token, roomName, roomHost, prediker, beskrywing } =
        activeRoom;
    const { connect, isConnecting, room, error, participants } = useRoom();
    const url = "wss://ptype.app/";

    useEffect(() => {
        if (roomName) {
            joinRoom(roomName);
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        connect(url, token).then((room) => {
            onConnected(room, isHost);
        });

        // THIS DOES NOT WORK!?!?!?!
        // return () => {
        //     room.disconnect();
        // };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (leaveRoom) {
            room.disconnect();
            history.push("/");
        }
        // eslint-disable-next-line
    }, [leaveRoom]);

    const onConnected = async (room, isHost) => {
        if (isHost === true) {
            const { deviceId } = newRoom;
            const audioTrackOptions = {
                deviceId: deviceId,
                autoGainControl: true,
                echoCancellation: true,
                name: "Host Audio Track",
                noiseSuppression: {
                    ideal: true,
                },
            };
            const track = await createLocalAudioTrack(audioTrackOptions);
            const publishOptions = {};
            room.localParticipant.publishTrack(track, publishOptions);
        }
    };

    const disconnect = () => {
        room.disconnect();
        history.push("/");
    };

    return (
        <div className="flex bg-gray-900 min-h-screen min-w-screen space-x-4 justify-center items-center">
            <div className="flex flex-col bg-gray-800 h-80 w-6/12 rounded-lg items-center justify-between">
                <div className="m-3 text-white">
                    <p className="text-xl font-bold">{roomHost}</p>
                    {participants.map((participant, index) => {
                        console.log(participant);
                        return (
                            <Participant
                                key={index}
                                participant={participant}
                                activeRoom={activeRoom}
                            />
                        );
                    })}
                </div>
                <div className="flex items-center justify-start w-full py-3 text-white px-5">
                    <p className="text-xl font-bold">Prediker: {prediker}</p>
                </div>
                <div className="flex items-center justify-start w-full py-3 text-white px-5">
                    <p className="text-xl font-bold">
                        Beskrywing: {beskrywing}
                    </p>
                </div>
                <div className="flex items-center justify-between w-full py-3 px-5">
                    <button className="inline-block align-baseline text-red-500 hover:text-red-800">
                        <p className="text-xl font-bold">Listeners: 10</p>
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={disconnect}
                    >
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    );
};

const Participant = ({ participant, activeRoom }) => {
    const { subscribedTracks } = useParticipant(participant);

    if (
        subscribedTracks.length > 0 &&
        activeRoom.identity !== participant.identity
    ) {
        console.log(subscribedTracks);

        return (
            <AudioRenderer
                track={subscribedTracks[0].audioTrack}
                isLocal={false}
            />
        );
    }

    return null;
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connectRedux(mapStoreStateToProps)(RoomPage);
