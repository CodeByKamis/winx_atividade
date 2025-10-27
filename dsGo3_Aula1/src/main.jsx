import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/main.scss';
import App from './App.jsx'
//necessário para o app rodar
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
