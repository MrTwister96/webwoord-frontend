import React from "react";
import { connect } from "react-redux";
import Room from "./Room";

const Rooms = ({ rooms }) => {
    return (
        <>
            <div className="flex flex-1 flex-col items-center space-y-3 py-20  min-h-screen ">
                {rooms.map((room, index) => {
                    const {
                        roomName,
                        roomHost,
                        prediker,
                        beskrywing,
                        listenerCount,
                    } = room;

                    return (
                        <Room
                            key={`${index}`}
                            roomName={roomName}
                            roomHost={roomHost}
                            prediker={prediker}
                            beskrywing={beskrywing}
                            listenerCount={listenerCount}
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

export default connect(mapStoreStateToProps)(Rooms);
