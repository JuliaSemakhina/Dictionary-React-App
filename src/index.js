import React from 'react';
import { createRoot } from 'react-dom/client';

import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context';

createRoot(document.getElementById('root'))
.render(
    <AppProvider>
    <App />
    </AppProvider>
);

reportWebVitals();
