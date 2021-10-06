import React from "react";
import Steams from "./Steams";

import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="flex flex-1 flex-col items-center space-y-3 py-20  min-h-screen bg-gray-900">
            <Steams />
        </div>
    );
};

export default HomePage;
