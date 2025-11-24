// src/Paginas/Galeria.jsx
import { useState, useEffect } from "react";
import { Camera } from "../Componentes/Camera";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "galeriaFotos";

export function Galeria() {
  const [fotos, setFotos] = useState([]);
  const navigate = useNavigate();

  // carrega fotos salvas no localStorage quando o componente monta
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setFotos(parsed);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar fotos do localStorage:", err);
    }
  }, []);

  // adiciona foto ao estado e persiste no localStorage
  const adicionarFoto = (novaFoto) => {
    setFotos((prevFotos) => {
      const atualizadas = [...prevFotos, novaFoto];

      // salva imediatamente no localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
      } catch (err) {
        console.error("Erro ao salvar foto no localStorage:", err);
        toast.error("Não foi possível salvar a foto localmente.");
      }

      // feedback visual
      if (atualizadas.length === 1) {
        toast.success(`Você já tirou ${atualizadas.length} foto!`);
      } else {
        toast.success(`Você já tirou ${atualizadas.length} fotos!`);
      }

      return atualizadas;
    });
  };

  //função para limpar a galeria
  const limparGaleria = () => {
    setFotos([]);
    localStorage.removeItem(STORAGE_KEY);
    toast("Galeria limpa.");
  };

  return (
    <main className="conteiner" aria-label="Galeria de fotos">
      <Toaster position="top-center" />

      <button
        className="button"
        onClick={() => navigate("/winx")}
        aria-label="botão para fechar o inventario"
        title="fechar inventario"
      >
        <span aria-hidden="true">×</span>
      </button>

      {/* camera envia a foto via onFotoTirada */}
      <Camera onFotoTirada={adicionarFoto} />

      <h2>Galeria de fotos</h2>

      {/* botão opcional para limpar */}
      {fotos.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <button onClick={limparGaleria} className="button" aria-label="Limpar galeria">
            Limpar galeria
          </button>
        </div>
      )}

      {fotos.length === 0 ? (
        <p>Nenhuma foto ainda! Tire uma com a câmera.</p>
      ) : (
        <ImageList
          sx={{
            width: "100%",
            maxWidth: 800,
            margin: "0 auto",
            height: "auto",
          }}
          cols={4}
          rowHeight={180}
        >
          {fotos.map((foto, index) => (
            <ImageListItem key={index}>
              <img
                src={foto}
                alt={`Foto ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: "8px" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </main>
  );
}
