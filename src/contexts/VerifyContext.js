import React, { createContext, useContext, useState } from "react";

// Create a context
const VerifyContext = createContext();

// Create a provider component
const VerifyProvider = ({ children }) => {
    const [user, setUser] = useState({
        serialNumber: "",  // Updated to match the component
        internName: "",    // Updated to match the component
    });

    return (
        <VerifyContext.Provider value={{ user, setUser }}>
            {children} {/* Use `children` instead of `Children` */}
        </VerifyContext.Provider>
    );
};

// Function to access the context
const UserState = () => {
    return useContext(VerifyContext);
};

export { VerifyProvider, UserState };
