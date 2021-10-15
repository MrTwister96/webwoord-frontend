import React from "react";
import { connect } from "react-redux";
import { setStreams } from "../../store/actions";
import Stream from "./Stream";

const Steams = ({ streams }) => {
    return (
        <>
            <div className="flex flex-1 flex-col items-center space-y-3 py-20  min-h-screen ">
                {streams.map((stream, index) => {
                    const {
                        roomName,
                        roomHost,
                        prediker,
                        beskrywing,
                        listenerCount,
                    } = stream;

                    return (
                        <Stream
                            key={`${index}`}
                            roomName={roomName}
                            streamer={roomHost}
                            speaker={prediker}
                            description={beskrywing}
                            listeners={listenerCount}
                        />
                    );
                })}
            </div>
        </>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setStreams: (streams) => dispatch(setStreams(streams)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Steams);
