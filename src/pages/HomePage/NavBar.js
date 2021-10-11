import React from "react";
import { useHistory } from "react-router-dom";

const NavBar = () => {
    let history = useHistory();

    const handleCreateStream = () => {
        history.push("/create-stream");
    };

    return (
        <div className="flex min-w-screen h-16 text-white items-center justify-end px-5">
            <button
                onClick={handleCreateStream}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Stream
            </button>
        </div>
    );
};

export default NavBar;
