import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TranslationProvider } from "./Functions/TranslateUI"; // 👈 import the provider



createRoot(document.getElementById('root')).render(
 
    <TranslationProvider>   
      <App />
    </TranslationProvider>
  
);
