import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        if(token){
            setAuthenticated(true);
        }
        if(userStr){
            setUser(JSON.parse(userStr));  // এখানে ঠিক করেছি
        }
    }, []);

    const login = (credentials) => {
        setAuthenticated(true);
        setUser(credentials);

        // LocalStorage এ সেভ করা
        localStorage.setItem("token", credentials.token);
        localStorage.setItem("user", JSON.stringify(credentials));
    };

    const logout = () => {
        setAuthenticated(false);
        setUser(null);

        // LocalStorage থেকে ডিলিট করা
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{authenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
