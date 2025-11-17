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
    <main className="conteiner" role="main" aria-labelledby="titulo-inventario">
      
      {/* botao para fehcar a pagina */}
      <button
        className="button"
        onClick={() => navigate("/winx")}
        aria-label="botão para fechar o inventario"
        title="fechar inventario"
      >
        <span aria-hidden="true">×</span>
      </button>

      {/* titulo da pagina */}
      <h2 id="titulo-inventario">INVENTÁRIO</h2>

      {/* tratativa de erro se não tiver figurinha nenhuma */}
      {figurinhas.length === 0 ? (
        <p className="vazio" role="status">
          nenhuma figurinha coletada ainda
        </p>
      ) : (
        <ul
          className="missoes-grid"
          /* lista de figurinhas */
          aria-label="lista de figurinhas"
        >
          {/* mostrar as figurinha */}
          {figurinhas.map((f) => (
            <li
              key={f.id}
              className="figurinha-card"
              /* cada figurinha individual */
              aria-label="figurinha"
            >
              <img
                className="imagemfigurinha"
                src={f.imagem}
                alt={`figurinha ${f.nome || f.id}`}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
