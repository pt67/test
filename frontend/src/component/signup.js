import React from 'react';
import { Link } from 'react-router-dom';
import '../app/signup.css';

export default function Signup(){
    return (
        
        <div className="signup-container">
        <h2>Create Account</h2>
        <form id="signup-form">
            <input type="text" id="username" name="username" placeholder="Username" required/>
            <input type="password" id="password" name="password" placeholder="Password" required/>
            <button type="submit">Sign Up</button>
        </form>
        <div className="link">
            Already have an account? <Link to="/login">Login</Link>
        </div>
        <div id="signup-message" style={{textAlign:'center', color:'#f76b1c', marginTop:'1em'}}>     
        </div>
    </div>
    
    );
}