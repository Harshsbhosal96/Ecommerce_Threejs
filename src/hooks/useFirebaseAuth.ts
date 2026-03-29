import { FormEvent, useEffect, useState } from 'react';

interface LoginCredentials {
    email: string;
    password: string;
}

interface DemoUser {
    email: string;
}

export interface UseFirebaseAuthReturn {
    user: DemoUser | null;
    isLoading: boolean;
    isConfigured: boolean;
    configMessage: string;
    missingKeys: string[];
    authError: string;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => Promise<void>;
    resetError: () => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>, credentials: LoginCredentials) => Promise<boolean>;
}

const DEFAULT_AUTH_ERROR = '';
const AUTH_STORAGE_KEY = 'earbeats-user';

const readStoredUser = (): DemoUser | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

        if (!storedUser) {
            return null;
        }

        const parsedUser = JSON.parse(storedUser) as DemoUser;

        if (!parsedUser?.email) {
            return null;
        }

        return parsedUser;
    } catch (error) {
        console.error('Unable to read auth user from localStorage.', error);
        return null;
    }
};

export const useFirebaseAuth = (): UseFirebaseAuthReturn => {
    const [user, setUser] = useState<DemoUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [authError, setAuthError] = useState<string>(DEFAULT_AUTH_ERROR);

    useEffect(() => {
        setUser(readStoredUser());
        setIsLoading(false);
    }, []);

    const resetError = () => {
        setAuthError(DEFAULT_AUTH_ERROR);
    };

    const login = async ({ email, password }: LoginCredentials): Promise<boolean> => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setAuthError('Email is required.');
            return false;
        }

        if (password.trim().length < 4) {
            setAuthError('Password must be at least 4 characters.');
            return false;
        }

        const nextUser = { email: normalizedEmail };
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
        setAuthError(DEFAULT_AUTH_ERROR);
        return true;
    };

    const logout = async (): Promise<void> => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
        setAuthError(DEFAULT_AUTH_ERROR);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>, credentials: LoginCredentials): Promise<boolean> => {
        event.preventDefault();
        return login(credentials);
    };

    return {
        user,
        isLoading,
        isConfigured: true,
        configMessage: 'Demo login is ready.',
        missingKeys: [],
        authError,
        login,
        logout,
        resetError,
        handleSubmit,
    };
};
