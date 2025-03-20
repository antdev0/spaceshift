import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { api, AxiosError } from "@services/api";
import toast from "react-hot-toast";

interface User {
    id: string;
    email: string;
    system_role: "admin" | "agent" | "tl";
    first_name?: string;
    last_name?: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<LoginResponse | null>;
    logout: () => Promise<void>;
    loading: boolean;
    loginLoading: boolean;
    logoutLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

interface LoginResponse {
    token: string;
    system_role: string;
}

// ✅ Initialize AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
    const isAuthenticated = !!user;

    // ✅ Fetch user details if token exists
    const fetchUser = useCallback(async () => {
        try {
            const response = await api.get<{ status: number; message: string; data: User }>("/auth/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Added Authorization Header
                },
            });

            setUser(response.data.data);
        } catch (error) {
            console.error("Fetch user failed", error);
            logout(); // Auto-logout if token is invalid
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [fetchUser]);

    // ✅ Login function (returns response & stores token)
    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        try {
            setLoginLoading(true);
            const response = await api.post<{ status: number; message: string; data: LoginResponse }>("/login", { email, password });

            if (response.data.data.token) {
                const { token, system_role } = response.data.data;

                localStorage.setItem("token", token);
               
                return { token, system_role };
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message ?? "Login failed");
            } else {
                toast.error("Login failed");
            }
            setLoginLoading(true);
        } 
        return null;
    };

    // ✅ Logout function (removes token & logs out user)
    const logout = async () => {
        try {
            setLogoutLoading(true);
            await api.post("/auth/logout", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
            setLogoutLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading, loginLoading, logoutLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
