import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './index.css'; // Make sure this file exists and is correctly styled
import Dashboard from './Dashboard.jsx';
import { BrowserRouter as Router } from 'react-router-dom'; // <-- Make sure this is imported

const root = createRoot(document.getElementById('root'));

root.render(
    <Router> {/* Wrap the entire application in Router */}
        <FluentProvider theme={webLightTheme}>
            <Dashboard />
        </FluentProvider>
    </Router>
);

