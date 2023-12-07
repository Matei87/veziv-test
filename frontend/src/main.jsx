import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { WorkContextProvider } from './context/work.context';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WorkContextProvider>
  </React.StrictMode>
);
