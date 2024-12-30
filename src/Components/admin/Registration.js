import React, { useState } from 'react';
import './Reg.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserTag } from '@fortawesome/free-solid-svg-icons';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();


        const formData = { username, password, role };

        try {
            const response = await fetch('arega/registration.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.error);
            }
        } catch (error) {
            setResponseMessage('Internal server error');
        }
    };

    return (
        <div className="main">
        <div className="container">
                       <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <FontAwesomeIcon icon={faUserTag} />
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <button className='regbutton' type="submit">Register</button>
                {responseMessage && <div id="responseMessage">{responseMessage}</div>}
            </form>
        </div>
        </div>
        
    );
};

export default Registration;
