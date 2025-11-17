export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado."))
        .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
    });
  }
}
