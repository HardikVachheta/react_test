import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../feactures/authSlice';

export const LoginPage = () => {

    const [userData, setUserData] = useState({ username: '', password: '' });
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(userData))
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='name'
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                <input
                    type="password"
                    placeholder='password'
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <button type='submit' disabled={loading}>Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
