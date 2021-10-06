import React from "react";
import Stream from "./Stream";

const Steams = () => {
    const streams = [
        {
            streamer: "EG Kerk Maranata",
            speaker: "Ds Willie Olivier",
            description: "Die Nagmal - 1 Kor 11:27",
            listeners: 39,
        },
        {
            streamer: "EG Kerk Pretoria Oos",
            speaker: "Ds Andre Bester",
            description: "Verbly jouself - Fil 4:4",
            listeners: 27,
        },
        {
            streamer: "EG Kerk Benoni",
            speaker: "Ds Gerhard Beukes",
            description: "Die Wonderlike Skepping - Gen 1",
            listeners: 32,
        },
        {
            streamer: "EG Kerk Kempton Park",
            speaker: "Ds Paul Grobbelaar",
            description: "Loof die Here - Ps 102",
            listeners: 18,
        },
        {
            streamer: "EG Kerk Wonderboom",
            speaker: "Ds Jurgens Prinsloo",
            description: "Die Here is my Herder - Ps 23",
            listeners: 22,
        },
    ];

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

export default Steams;
