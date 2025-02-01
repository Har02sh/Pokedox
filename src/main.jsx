import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
// This allows us to use the react-router-dom in whole app.
  <StrictMode>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
