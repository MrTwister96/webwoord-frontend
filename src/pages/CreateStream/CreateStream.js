import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../../utils/api";
import { setNewRoom, setActiveRoom } from "../../store/actions";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
// Components
import Input from "./Input";
import AudioSelect from "./AudioSelect";

const CreateStream = ({ setNewRoom, socket, setActiveRoom }) => {
    let history = useHistory();
    const [kerkNaam, setKerkNaam] = useState("");
    const [prediker, setPrediker] = useState("");
    const [beskrywing, setBeskrywing] = useState("");
    const [audioInputs, setAudioInputs] = useState([
        {
            deviceId: "NONE",
            label: "NONE",
        },
    ]);
    const [selected, setSelected] = useState(audioInputs[0]);

    const validateInputs = () => {
        if (
            kerkNaam !== "" &&
            prediker !== "" &&
            beskrywing !== "" &&
            selected.deviceId !== "NONE"
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleCreateStream = async (event) => {
        event.preventDefault();

        if (validateInputs()) {
            const newRoom = {
                roomName: uuidv4(),
                identity: kerkNaam,
                roomHostSocketId: socket,
                isHost: true,
                prediker: prediker,
                beskrywing: beskrywing,
                deviceId: selected.deviceId,
            };

            setNewRoom(newRoom);
            const response = await getToken(newRoom);

            const room = {
                isHost: true,
                token: response.token,
                roomName: null,
                roomHost: kerkNaam,
                prediker: prediker,
                beskrywing: beskrywing,
                identity: kerkNaam,
            };

            setActiveRoom(room);

            history.push(`/room`);
        } else {
            alert("Please complete all the fields");
        }
    };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then((s) => {
                navigator.mediaDevices.enumerateDevices().then((devices) => {
                    let devs = [];
                    devices.forEach((device) => {
                        if (
                            device.kind === "audioinput" &&
                            device.deviceId !== "default"
                        ) {
                            const dev = {
                                deviceId: device.deviceId,
                                label: device.label,
                            };
                            devs = [...devs, dev];
                        }
                    });
                    setAudioInputs(devs);
                });
            });
    }, []);

    return (
        <div className="flex bg-gray-900 min-h-screen min-w-screen justify-center items-center">
            <div className="w-full max-w-md">
                <form className="text-white rounded-lg px-8 py-8 bg-gray-800 bg-opacity-80">
                    <Input
                        label="Kerk Naam"
                        placeholder="Kerk Naam"
                        onChange={(event) => setKerkNaam(event.target.value)}
                    />
                    <Input
                        label="Prediker"
                        placeholder="Prediker"
                        onChange={(event) => setPrediker(event.target.value)}
                    />
                    <Input
                        label="Beskrywing"
                        placeholder="Beskrywing"
                        onChange={(event) => setBeskrywing(event.target.value)}
                    />

                    <AudioSelect
                        selected={selected}
                        setSelected={setSelected}
                        audioInputs={audioInputs}
                    />

                    <div className="flex items-center justify-between mt-4">
                        <button
                            className="btn-green"
                            onClick={handleCreateStream}
                        >
                            Start Stream
                        </button>
                        <button
                            className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
                            onClick={(event) => {
                                event.preventDefault();
                                history.push("/");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setNewRoom: (newRoom) => dispatch(setNewRoom(newRoom)),
        setActiveRoom: (room) => dispatch(setActiveRoom(room)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CreateStream);
