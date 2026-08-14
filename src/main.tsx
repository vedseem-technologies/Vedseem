import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import App from './App.tsx';
import './index.css';

// Initialize EmailJS with public key
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
