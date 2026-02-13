import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AuthTokenResponse, type AuthModel } from '../types';
import { jwtDecode } from "jwt-decode";
import { authService } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    token: string | null;
    login: (credentials: AuthModel) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    role: string | null;
    user: DecodedToken | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
    exp: number;
    "/identity/claims/role"?: string;
    role?: string;
    Avatar?: string;
    [key: string]: any;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setRole(decoded["/identity/claims/role"] || decoded.role || null);
            } catch (e) {
                console.error("Invalid token", e);
                setRole(null);
            }
        } else {
            localStorage.removeItem('token');
            setRole(null);
        }
    }, [token]);

    const login = async (credentials: AuthModel) => {
        try {
            const response: AuthTokenResponse = await authService.login(credentials);
            if (response.accessToken) {
                setToken(response.accessToken);
                try {
                    const decoded = jwtDecode<DecodedToken>(response.accessToken);
                    const userRole = decoded["/identity/claims/role"] || decoded.role || null;
                    if (userRole === "Lecturer") {
                        navigate('/lecturer-dashboard');
                    } else if (userRole === "Admin") {
                        navigate('/');
                    } else {
                        navigate('/');
                    }
                } catch {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, role, user: token ? jwtDecode<DecodedToken>(token) : null }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
