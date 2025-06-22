import React from 'react';
import ReactDOM from 'react-dom/client';
// Modifică importul: BrowserRouter devine HashRouter
import { HashRouter } from 'react-router-dom'; 
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { AppProvider } from './contexts/AppContext.tsx';
import './index.css';

console.log('[main.tsx] Script start. About to render React app.');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Modifică aici: BrowserRouter devine HashRouter */}
      <HashRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

console.log('[main.tsx] ReactDOM.createRoot().render() called.');
