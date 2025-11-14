import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  return (
    <main className="conteiner" role="main" aria-label="tela de inventario">
      
      {/* botao para fehcar a pagina */}
      <button
        className="button"
        onClick={() => navigate("/winx")}
        aria-label="botão para fechar o inventario"
        title="fechar inventario"
      >
        x
      </button>
      {/* titulo da pagina */}
      <h2 id="titulo-inventario">INVENTÁRIO</h2>
      {/* tratativa de erro se não tiver figurinha nenhuma */}
      {figurinhas.length === 0 ? (
        <p className="vazio" role="status">
          nenhuma figurinha coletada ainda
        </p>
      ) : (
        <div
          className="missoes-grid"
          role="lista"
          aria-labelledby="titulo do inventario"
        >
          {/* mostrar as figurinha */}
          {figurinhas.map((f) => (
            <div
              key={f.id}
              className="figurinha-card"
              role="lista figurinhas"
              aria-label={"figurinhas"}
            >
              <img
                className="imagemfigurinha"
                src={f.imagem}
                alt={"figurinha"}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
