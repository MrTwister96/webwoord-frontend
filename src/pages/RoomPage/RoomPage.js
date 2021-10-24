import React, { useEffect, useState } from "react";
import { AudioRenderer, useRoom } from "livekit-react";
import { createLocalAudioTrack, RoomEvent } from "livekit-client";
import { useHistory } from "react-router-dom";
import { connect as connectRedux } from "react-redux";
import { joinRoom } from "../../utils/socketio";

import Loader from "../../components/Loader";

const RoomPage = ({ activeRoom, newRoom }) => {
    let history = useHistory();
    const { isHost, token, roomName, roomHost, prediker, beskrywing } =
        activeRoom;
    // eslint-disable-next-line
    const { connect, isConnecting, room, error, participants } = useRoom();
    const [listeners, setListeners] = useState(0);
    const [track, setTrack] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const url = "wss://banshee.ptype.app/";

    useEffect(() => {
        const unblock = history.block((location, action) => {
            if (action === "POP") {
                const tMesasge = {
                    type: "Error",
                    message: "Please use disconnect button instead",
                };
                setToastMessage(tMesasge);
                return false;
            }
        });

        if (roomName) {
            joinRoom(roomName);
        } else {
            if (isHost === false) {
                history.push("/");
            }
        }

        if (token) {
            connect(url, token)
                .then((room) => {
                    room.on(RoomEvent.ParticipantConnected, () =>
                        updateParticipantSize(room)
                    );
                    room.on(RoomEvent.ParticipantDisconnected, () =>
                        updateParticipantSize(room)
                    );
                    room.on(RoomEvent.TrackSubscribed, (track) => {
                        setTrack(track);
                    });
                    room.on(RoomEvent.TrackUnsubscribed, () => {
                        const tMesasge = {
                            type: "Informational",
                            message: "Stream has ended!",
                        };
                        setToastMessage(tMesasge);
                        setTimeout(() => {
                            room.disconnect();
                            history.go(0);
                        }, 2000);
                    });
                    updateParticipantSize(room);
                    onConnected(room, isHost);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return () => {
            unblock();
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (toastMessage) {
            setTimeout(() => {
                setToastMessage(null);
            }, 2000);
        }
    }, [toastMessage]);

    const updateParticipantSize = (room) => {
        setListeners(room.participants.size);
    };

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
        history.go(0);
    };

    if (isConnecting || (isHost === false && track === null)) {
        return <Loader />;
    }

    return (
        <>
            {toastMessage && (
                <ToastAlert
                    message={toastMessage.message}
                    type={toastMessage.type}
                />
            )}
            <div className="flex bg-gray-900 min-h-screen min-w-screen space-x-4 justify-center items-center">
                <div className="flex flex-col bg-gray-800 h-80 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-lg items-center justify-between">
                    <div className="m-3 text-white">
                        <p className="text-xl font-bold">{roomHost}</p>
                        {track && (
                            <AudioRenderer track={track} isLocal={false} />
                        )}
                    </div>
                    <div className="flex items-center justify-start w-full py-3 text-white px-5">
                        <p className="text-xl font-bold">
                            Prediker: {prediker}
                        </p>
                    </div>
                    <div className="flex items-center justify-start w-full py-3 text-white px-5">
                        <p className="text-xl font-bold">
                            Beskrywing: {beskrywing}
                        </p>
                    </div>
                    <div className="flex items-center justify-between w-full py-3 px-5">
                        <button className="inline-block align-baseline text-green-500 hover:text-green-800">
                            <p className="text-xl font-bold">
                                Listeners: {listeners}
                            </p>
                        </button>
                        <button
                            className="btn-red"
                            type="button"
                            onClick={disconnect}
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const ToastAlert = ({ message, type }) => {
    const [bannerClass, setBannerClass] = useState(null);
    const [messageClass, setMessageClass] = useState(null);

    useEffect(() => {
        if (type === "Error") {
            setBannerClass(
                "bg-red-500 text-white font-bold rounded-t px-4 py-2"
            );
            setMessageClass(
                "border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
            );
        } else if (type === "Informational") {
            setBannerClass(
                "bg-yellow-500 text-white font-bold rounded-t px-4 py-2"
            );
            setMessageClass(
                "border border-t-0 border-yellow-400 rounded-b bg-red-100 px-4 py-3 text-yellow-700"
            );
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div role="alert" className="fixed top-5 left-5">
            <div className={bannerClass}>{type}</div>
            <div className={messageClass}>
                <p>{message}</p>
            </div>
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connectRedux(mapStoreStateToProps)(RoomPage);
