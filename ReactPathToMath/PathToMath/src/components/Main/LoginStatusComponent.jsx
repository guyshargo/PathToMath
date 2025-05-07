import { createContext, useContext, useState } from 'react';

// Create the LoginContext
const LoginStautsContext = createContext();

// Create the LoginProvider component
export const LoginStatusProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <LoginStautsContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoginStautsContext.Provider>
    );
};

export const useLoginStatus = () => useContext(LoginStautsContext);