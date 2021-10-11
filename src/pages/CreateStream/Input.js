import React from "react";

const Input = (data) => {
    const { label, placeholder, onChange } = data;
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
