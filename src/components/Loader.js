import React from "react";

const Loader = () => {
    let circleCommonClasses = "h-5 w-5 bg-green-500   rounded-full";

    return (
        <div className="flex min-h-screen min-s-screen items-center justify-center bg-gray-900">
            <div className={`${circleCommonClasses} mr-2 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-2 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;
