import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// importa o SASS principal (correto com WebPack)
import "./Style/main.scss";

// registra o service worker (como o PDF orienta)
import { register } from "./registerServiceWorker";

// inicializa o service worker
register();

// renderização do React
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
