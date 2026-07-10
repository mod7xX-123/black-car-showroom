import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import SchemaOrg from './components/Schema0rg';

createRoot(document.getElementById('root')!).render(
 <HelmetProvider>
  <StrictMode>
    <SchemaOrg />
    <App />
  </StrictMode>
</HelmetProvider>
)
