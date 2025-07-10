// src/index.jsx
import React from 'react';
import './app/homepage.css';
import ReactDOM from 'react-dom/client';
import Page from './component/page';

function App() {
  return (
  
  <div className="container">
        <Page/>
        <p>
            Manage your products easily.<br/>
            Sign up or log in to get started!
            
        </p>
        <div className="actions">
            <a href="/login/">Login</a>
            <a href="/signup/">Sign Up</a>
        </div>
    </div> 
    
    );


}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
