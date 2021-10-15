import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../../utils/api";
import Input from "./Input";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { Listbox, Transition } from "@headlessui/react";
import { setNewStream } from "../../store/actions";
import { connect } from "react-redux";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

// let audioInputs = [];
const CreateStream = ({ newStream, setNewStream, identity }) => {
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

    const handleKerkNaamChange = async (event) => {
        await setKerkNaam(event.target.value);
    };

    const handlePredikerChange = (event) => {
        setPrediker(event.target.value);
    };

    const handleBeskrywingChange = (event) => {
        setBeskrywing(event.target.value);
    };

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
            const stream = {
                kerkNaam,
                prediker,
                beskrywing,
                deviceId: selected.deviceId,
                roomName: `${kerkNaam}-${prediker}-${beskrywing}`,
            };

            setNewStream(stream);

            const streamData = {
                roomName: `${kerkNaam}-${prediker}-${beskrywing}`,
                identity: prediker,
                host: true,
                socketId: identity,
            };
            const response = await getToken(streamData);

            history.push(`/room?token=${response.token}&host=true`);
        } else {
            alert("Please complete all the fields");
        }
    };

    useEffect(() => {
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
    }, []);

    return (
        <div className="flex bg-gray-900 min-h-screen min-w-screen justify-center items-center">
            <div className="w-full max-w-md">
                <form className="text-white rounded-lg px-8 pt-6 pb-8 mb-4 bg-gray-800 bg-opacity-80">
                    <Input
                        label="Kerk Naam"
                        placeholder="Kerk Naam"
                        onChange={handleKerkNaamChange}
                    />
                    <Input
                        label="Prediker"
                        placeholder="Prediker"
                        onChange={handlePredikerChange}
                    />
                    <Input
                        label="Beskrywing"
                        placeholder="Beskrywing"
                        onChange={handleBeskrywingChange}
                    />

                    <Listbox value={selected} onChange={setSelected}>
                        <Listbox.Label className="block text-sm font-bold text-white">
                            Audio Input
                        </Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="text-black block truncate">
                                    {selected.label}
                                </span>
                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <BiChevronDown
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {audioInputs.map((input) => (
                                        <Listbox.Option
                                            key={input.deviceId}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? "text-white bg-indigo-600"
                                                        : "text-gray-900",
                                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                                )
                                            }
                                            value={input}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={classNames(
                                                            selected
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                            "ml-3 block truncate"
                                                        )}
                                                    >
                                                        {input.label}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active
                                                                    ? "text-white"
                                                                    : "text-indigo-600",
                                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                                            )}
                                                        >
                                                            <BiCheck
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>

                    <div className="flex items-center justify-between mt-4">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
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
                            // onClick={() => history.push("/")}
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
        setNewStream: (newStream) => dispatch(setNewStream(newStream)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CreateStream);
