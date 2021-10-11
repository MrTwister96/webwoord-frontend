import React from "react";
import { LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import { CreateAudioTrackOptions, createLocalAudioTrack } from "livekit-client";
import { useLocation } from "react-router-dom";

const RoomPage = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token");
    const host = query.get("host");
    const deviceId = query.get("deviceId");

    const url = "ws://192.168.0.114:7880";
    // const token =
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzY1NDA5NTgsImlzcyI6IkFQSW4yNm1IVnJkTHhCbyIsImp0aSI6IlNjaGFsazIiLCJuYmYiOjE2MzM5NDg5NTgsInN1YiI6IlNjaGFsazIiLCJ2aWRlbyI6eyJyb29tIjoibXlyb29tIiwicm9vbUpvaW4iOnRydWV9fQ.QTxy5wq8bZ--yY9yyG5XD4FM7P2ByLav4H1oKkPfqTA";
    return (
        <div className="roomContainer">
            <LiveKitRoom
                url={url}
                token={token}
                onConnected={(room) => onConnected(room, host, deviceId)}
            />
        </div>
    );
};

const onConnected = async (room, host, deviceId) => {
    if (host === "true") {
        console.log(deviceId);
        const track = await createLocalAudioTrack();
        console.log(track);

        const publishOptions = {};
        publishOptions.simulcast = true;
        room.localParticipant.publishTrack(track, publishOptions);
    }
    // tracks.forEach((track) => {
    //     const publishOptions = {};
    //     publishOptions.simulcast = true;
    //     room.localParticipant.publishTrack(track, publishOptions);
    // });

    // const audioTrack = await createLocalAudioTrack();
    // await room.localParticipant.publishTrack(audioTrack);
    // const videoTrack = await createLocalVideoTrack();
    // await room.localParticipant.publishTrack(videoTrack);
};

export default RoomPage;
