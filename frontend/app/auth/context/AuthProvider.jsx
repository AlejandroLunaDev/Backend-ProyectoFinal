/* eslint-disable react/prop-types */
import { createContext } from "react";
import { loginUser } from "../../services/auth/loginUser";
import { logOutUser } from "../../services/auth/logOutUser";
import { loginGitHubUser } from "../../services/auth/loginGitHubUser";
import { loginGoogleUser } from "../../services/auth/loginGoogleUser";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            const data = await response.json(); // Esto es innecesario y provoca el error

            return data;
        } catch (error) {
            console.error('Login error in AuthProvider:', error);
            return { status: 'error', message: 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            const response = await logOutUser();
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Logout error in AuthProvider:', error);
            return { status: 'error', message: 'Logout failed' };
        }
    };

    const loginWithGitHub = async () => {
        try {
            const response = await loginGitHubUser();
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Login with GitHub error in AuthProvider:', error);
            return { status: 'error', message: 'Login with GitHub failed' };
        }
    };

    const loginWithGoogle = async () => {
        try {
            const response = await loginGoogleUser();
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Login with Google error in AuthProvider:', error);
            return { status: 'error', message: 'Login with Google failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, loginWithGitHub, loginWithGoogle }}>{children}</AuthContext.Provider>
    );
}
