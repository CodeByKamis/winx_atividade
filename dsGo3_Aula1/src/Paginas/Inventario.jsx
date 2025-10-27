import { useEffect, useState } from "react";

//mostra as figurinhas coletadas
export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]); //guarda as figurinhas

  useEffect(() => {
    //carrega o inventário do localStorage ao abrir a página
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  const limparInventario = () => {
    if (!window.confirm("Deseja realmente limpar o inventário?")) return; //pede confirmação antes de limpar todo
    localStorage.removeItem("inventario"); //remove o inventário do localStorage
    setFigurinhas([]); //atualiza o estado pra lista sumir da tela

  };

  return (
    <main
      className="conteiner"
      role="main" //indica conteúdo principal
      aria-labelledby="titulo-inventario"
      tabIndex={-1} //foco inicial via teclado
    >
      <section
        className="inventario"
        aria-describedby="descricao-inventario"
      >
        <h1 id="titulo-inventario">Inventário</h1>
        <p id="descricao-inventario" className="sr-only">
          esta seção mostra as figurinhas coletadas e permite limpar elas
        </p>

        {/*botão pra limpar inventário*/}
        <button
          className="limpar-inventario"
          onClick={limparInventario}
          type="button"
          aria-label="limpar todo o inventário de figurinhas"
          title="limpar inventário"
        >
          limpar inventário
        </button>

        {/*se não tiver nenhuma figurinha*/}
        {figurinhas.length === 0 ? (
          <p
            className="vazio"
            aria-live="polite" //leitor de tela  avisa quando mudar
            role="status"
            tabIndex={0}
          >
            nenhuma figurinha coletada ainda!
          </p>
        ) : (
          //lista de figurinhas
          <ul
            className="grid"
            role="list"
            aria-label="lista de figurinhas coletadas"
          >
            {figurinhas.map((f) => (
              <li
                key={f.id}
                className="figurinha"
                role="listitem"
                tabIndex={0}
                aria-label={`figurinha de ${f.nome}`}
              >
                <figure>
                  <img
                    src={f.imagem}
                    alt={`figurinha de ${f.nome}`}
                    loading="lazy" //carrega imagem so quando precisar
                    decoding="async" 
                    width="120"
                    height="120"
                  />
                  <figcaption>{f.nome}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/*é o rodapé*/}
      <footer className="rodape" role="contentinfo">
        <p>© 2025 Winx. todos os direitos reservados pra Kamis.</p>
      </footer>
    </main>
  );
}
