import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';
import { createRoot } from "react-dom/client";

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
