import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'Admin' && password === 'Admin@123') {
            setIsLoggedIn(true);
            
        }
        else{
            alert("Wrong ID or Password")
        }
    };

    return (
        <div>

            
            {isLoggedIn ? (
                <Dashboard />
            ) : (

                
                    <form onSubmit={handleSubmit} style={{
                        background: 'linear-gradient(130deg, #966f33,navy) ', width: '400px',
                        height: '300px', display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
}}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Login;
