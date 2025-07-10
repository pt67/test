// src/index.jsx
import React from 'react';
import './app/homepage.css';
import ReactDOM from 'react-dom/client';

function App() {
  return (
  
  <div class="container">
        <h1>Welcome to Product Manager</h1>
        <p>
            Manage your products easily.<br/>
            Sign up or log in to get started!
        </p>
        <div class="actions">
            <a href="/login/">Login</a>
            <a href="/signup/">Sign Up</a>
        </div>
    </div> 
    
    );


}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
