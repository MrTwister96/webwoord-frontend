import React, { useEffect } from "react";
import { LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import { createLocalAudioTrack } from "livekit-client";
import { joinRoom } from "../../utils/socketio";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const RoomPage = ({ leaveRoom, room, newRoom }) => {
    const { isHost, token, roomName } = room;
    let history = useHistory();

    useEffect(() => {
        if (roomName) {
            joinRoom(roomName);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (leaveRoom) {
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
                noiseSuppression: true,
            };
            const track = await createLocalAudioTrack(audioTrackOptions);
            const publishOptions = { simulcast: true };
            room.localParticipant.publishTrack(track, publishOptions);
        }
    };

    const url = "ws://192.168.8.102:7880";
    return (
        <div className="roomContainer">
            <LiveKitRoom
                url={url}
                token={token}
                onConnected={(room) => onConnected(room, isHost)}
            />
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(RoomPage);
