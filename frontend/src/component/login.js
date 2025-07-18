import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../app/login.css';

function Login(){
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in with:', { username, password });
        // You can add API call to authenticate user here
        fetch('/api/token/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
})
.then(response => {
    if (response.ok) {
        return response.json();  // ✅ Extract JSON from response
    } else {
        throw new Error('Login failed');
    }
})
.then(data => {
    const token = data.token;  // ✅ This is your actual token
    localStorage.setItem('token', token);  // Store it for later use
    localStorage.setItem('username', username); // Optional
    navigate('/dashboard');  // Redirect to dashboard
})
.catch(error => {
    console.error(error);
    setMessage('Login failed. Please try again.');
});
}

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <div id="login-message" style={{textAlign:'center', color:'#f76b1c', marginTop:'1em'}}>
                    {message}
                </div>
                <input type="text" onChange={ (e)=>setUsername(e.target.value)  } name="username" placeholder="Username" required />
                <input type="password" onChange={(e)=>setPassword(e.target.value)}  name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup/">Sign Up</Link></p>
        </div>
    );
}

export default Login;