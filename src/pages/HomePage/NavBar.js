import React from "react";
import { useHistory } from "react-router-dom";

const NavBar = () => {
    let history = useHistory();

    const handleCreateStream = () => {
        history.push("/create-stream");
    };

    return (
        <div className="flex h-16 px-5 items-center justify-end ">
            <button onClick={handleCreateStream} className="btn-green">
                Create Room
            </button>
        </div>
    );
};

export default NavBar;
