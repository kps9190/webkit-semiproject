import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './index.css';
import Dashboard from './Dashboard.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <Router>
        <AuthProvider>
            {' '}
            {/* ✅ AuthProvider로 감싸기 */}
            <FluentProvider theme={webLightTheme}>
                <Dashboard />
            </FluentProvider>
        </AuthProvider>
    </Router>
);
