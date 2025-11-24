// src/Componentes/Camera.jsx
import { useRef, useState, useEffect } from "react";

export function Camera({ onFotoTirada }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const streamRef = useRef(null);

  useEffect(() => {
    iniciarCamera();

    return () => {
      // cleanup: parar todas as tracks quando desmontar
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        const p = videoRef.current.play?.();
        if (p && typeof p.then === "function") {
          p.catch((err) => {
            console.warn("Não foi possível reproduzir o vídeo automaticamente:", err);
          });
        }
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  };

  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // salva a foto em base64 (MIME correto)
    const imagem = canvas.toDataURL("image/png");

    // guarda para pré-visualização local
    setFoto(imagem);

    // envia a foto pra galeria
    if (typeof onFotoTirada === "function") {
      onFotoTirada(imagem);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const reiniciar = async () => {
    // limpa a foto atual e reinicia a camera
    setFoto(null);
    await iniciarCamera();
  };

  return (
    <section className="camera-box">
      <h2>Captura de Imagem</h2>

      <div className="preview">
        {!foto ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            aria-label="Fluxo da câmera"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img src={foto} alt="Foto capturada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>

      <div className="botoes">
        {!foto ? (
          <button onClick={tirarFoto} className="btn-acao" aria-label="Tirar foto">
            Tirar Foto
          </button>
        ) : (
          <button onClick={reiniciar} className="btn-secundario" aria-label="Tirar nova foto">
            Nova Foto
          </button>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </section>
  );
}
