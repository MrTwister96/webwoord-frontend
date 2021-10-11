import React from "react";
// Components
import Steams from "./Steams";
import NavBar from "./NavBar";

const HomePage = () => {
    return (
        <div className="flex flex-col bg-gray-900">
            <NavBar />
            <Steams />
        </div>
    );
};

export default HomePage;
