import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import { ProductProvider } from './contexts/ProductContext';
import { VerifyProvider } from './contexts/VerifyContext';  // Add VerifyProvider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <VerifyProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </VerifyProvider>
  </React.StrictMode>
);
