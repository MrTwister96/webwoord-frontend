import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../../utils/api";
import Input from "./Input";

const CreateStream = () => {
    let history = useHistory();
    const [streamName, setStreamName] = useState("");
    const [hostName, setHostName] = useState("");
    const [scripture, setScripture] = useState("");
    const [theme, setTheme] = useState("");

    const handleStreamNameValueChange = (event) => {
        setStreamName(event.target.value);
    };

    const handleHostNameValueChange = (event) => {
        setHostName(event.target.value);
    };

    const handleScriptureValueChange = (event) => {
        setScripture(event.target.value);
    };

    const handleThemeValueChange = (event) => {
        setTheme(event.target.value);
    };

    const handleCreateStream = async () => {
        const streamData = {
            roomName: streamName,
            identity: hostName,
            host: true,
        };
        const response = await getToken(streamData);

        history.push(`/room?token=${response.token}`);
    };

    return (
        <div className="flex bg-gray-900 min-h-screen min-w-screen justify-center items-center">
            <div className="w-full max-w-md">
                <form className="text-white rounded-lg px-8 pt-6 pb-8 mb-4 bg-gray-800 bg-opacity-80">
                    <Input
                        label="Stream Name"
                        placeholder="Stream Name"
                        onChange={handleStreamNameValueChange}
                    />
                    <Input
                        label="Host Name"
                        placeholder="Host Name"
                        onChange={handleHostNameValueChange}
                    />
                    <Input
                        label="Theme"
                        placeholder="Theme"
                        onChange={handleThemeValueChange}
                    />
                    <Input
                        label="Scripture"
                        placeholder="Scripture"
                        onChange={handleScriptureValueChange}
                    />

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleCreateStream}
                        >
                            Start Stream
                        </button>
                        <button
                            className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
                            onClick={() => history.push("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStream;
