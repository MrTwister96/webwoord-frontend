import React from "react";
import { showstreams } from "../../utils/socketio";

const Administrators = () => {
    const clickit = () => {
        showstreams();
    };
    return (
        <div>
            <button onClick={clickit}>Show rooms</button>
        </div>
    );
};

export default Administrators;
