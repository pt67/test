// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Login from './component/login';
import Signup from './component/signup';
import Dashboard from './component/dashboard';

import './app/homepage.css';
import Page from './component/page';

// Main landing page
function App() {
  return (
    <div className="container">
      <Page />
      <p>
        Manage your products easily.<br />
        Sign up or log in to get started!
      </p>
      <div className="actions">
        <Link to="/login/">Login</Link>
        <Link to="/signup/">Sign Up</Link>
        <Link to="/about/">About</Link>
      </div>
    </div>
  );
}

// Placeholder route component
function About() {
  return <h1 style={{ textAlign:'center' }}>About Product Management</h1>;
}

// Define router
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup/> },
  { path: "/dashboard", element: <Dashboard /> },
]);

// Mount router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
