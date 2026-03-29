import React, { useState } from 'react';
import '../Style/authPanel.css';

interface AuthPanelProps {
    isOpen: boolean;
    isConfigured: boolean;
    isLoading: boolean;
    configMessage: string;
    authError: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>, credentials: { email: string; password: string; }) => Promise<boolean>;
    onClose: () => void;
    onClearError: () => void;
}

function AuthPanel({
    isOpen,
    isConfigured,
    isLoading,
    configMessage,
    authError,
    onSubmit,
    onClose,
    onClearError,
}: AuthPanelProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    if (!isOpen) {
        return null;
    }

    const handlePanelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const didLogin = await onSubmit(event, { email, password });

        if (didLogin) {
            setEmail('');
            setPassword('');
            onClose();
        }
    };

    return (
        <div className='auth_panel_backdrop' onClick={onClose}>
            <div className='auth_panel' onClick={(event) => event.stopPropagation()}>
                <div className='auth_panel_header'>
                    <div>
                        <span className='auth_panel_eyebrow'>Account</span>
                        <h3>Sign in</h3>
                    </div>
                    <button type='button' className='auth_panel_close' onClick={onClose}>
                        Close
                    </button>
                </div>

                {!isConfigured ? (
                    <div className='auth_panel_message auth_panel_message_config'>
                        <p>{configMessage}</p>
                        <small>Add the Firebase keys to your local .env file and restart the app.</small>
                    </div>
                ) : (
                    <form className='auth_panel_form' onSubmit={handlePanelSubmit}>
                        <label htmlFor='auth-email'>Email</label>
                        <input
                            id='auth-email'
                            type='email'
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                onClearError();
                            }}
                            placeholder='you@example.com'
                            autoComplete='email'
                            required
                        />

                        <label htmlFor='auth-password'>Password</label>
                        <input
                            id='auth-password'
                            type='password'
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                onClearError();
                            }}
                            placeholder='Enter your password'
                            autoComplete='current-password'
                            required
                        />

                        {authError && (
                            <p className='auth_panel_message auth_panel_message_error'>{authError}</p>
                        )}

                        <button type='submit' className='auth_panel_submit' disabled={isLoading}>
                            {isLoading ? 'Please wait...' : 'Login'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPanel;