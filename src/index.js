// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Add toast styles

ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer /> {/* If using react-toastify */}
    </React.StrictMode>,
    document.getElementById('root')
);
