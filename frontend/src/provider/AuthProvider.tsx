import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./../context/AuthContext";
import type { User } from "../types/auth.type";

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("accessToken");
    });

    const login = (newToken: string, newUser: User) => {

        setToken(newToken);
        setUser(newUser);

        localStorage.setItem("accessToken", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));

    };

    const logout = () => {

        setToken(null);
        setUser(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

    };

    const value = useMemo(
        () => ({
            user,
            token,
            login,
            logout,
            isAuthenticated: !!token,
        }),
        [user, token]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}