import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AuthTokenResponse, type AuthModel } from '../types';
import { authService } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    token: string | null;
    login: (credentials: AuthModel) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (credentials: AuthModel) => {
        try {
            const response: AuthTokenResponse = await authService.login(credentials);
            if (response.accessToken) {
                setToken(response.accessToken);
                navigate('/'); // Redirect to dashboard after login
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
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
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
