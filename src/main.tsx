import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './static/css/tailwind.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);