import React from "react";
import { connect } from "react-redux";
import { setStreams } from "../../store/actions";
import Stream from "./Stream";

const Steams = ({ streams }) => {
    return (
        <>
            {streams.map((stream, index) => {
                const { streamer, speaker, description, listeners } = stream;

                return (
                    <Stream
                        streamer={streamer}
                        speaker={speaker}
                        description={description}
                        listeners={listeners}
                    />
                );
            })}
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
