import React, { useState, useContext } from 'react';
import { NotificationContext } from '../../components/notifications/NotificationList';

import './Login.css';

const LoginForm = () => {
    const { addNotification } = useContext(NotificationContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            addNotification(1, 'Please fill out all fields');
            return;
        }

        try {
            window.location.href = '/home';
            return;
        } catch (error) {
            addNotification(1, 'error: ' + error);
            return;
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} className="login-form">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginForm;