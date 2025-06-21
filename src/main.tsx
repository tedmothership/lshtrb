import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { AppProvider } from './contexts/AppContext.tsx';
import './index.css';

console.log('[main.tsx] Script start. About to render React app.');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Removed 'future' prop from BrowserRouter for diagnostic purposes */}
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

console.log('[main.tsx] ReactDOM.createRoot().render() called.');
