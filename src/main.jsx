import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './index.css'; // Make sure this file exists and is correctly styled
import Dashboard from './Dashboard.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <FluentProvider theme={webLightTheme}>
        <Dashboard />
    </FluentProvider>,
);
