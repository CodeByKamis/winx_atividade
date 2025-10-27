import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { missoes } from "../Dados/dadosMissao";
import { MissaoCard } from "../Componentes/MissaoCard";
import { MissaoModal } from "../Componentes/MissaoModal";

// pg de missões
export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null); //guarda a missão que ta aberta no modal
  const [missoesConcluidas, setMissoesConcluidas] = useState([]); //lista de ids de missões que foi concluido
  const navigate = useNavigate(); //pra voltar pra tela inicial

  const concluirMissao = (id) => {
    //adiciona missão concluída e fecha modal
    setMissoesConcluidas((prev) => [...prev, id]);
    setMissaoSelecionada(null);
  };
  //funcaozinha para voltar pra tela
  const voltarTelaInicial = () => {
    navigate("/winx"); //volta pra pg principal
  };

  return (
    <section className="conteiner" role="region" aria-label="seção de missões do jogo">
      {/*botão pra fechar as missao*/}
      <button
        className="botao-fechar"
        onClick={voltarTelaInicial}
        aria-label="fechar e voltar à tela inicial"
        title="fechar"
      >
        ×
      </button>

      <h2 >MISSÕES</h2>

      {/*lista das missao*/}
      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={m.id}
            missao={m}
            onIniciarMissao={setMissaoSelecionada} //abre o modal
            concluida={missoesConcluidas.includes(m.id)} //marca se já terminou
          />
        ))}
      </div>

      {/*modal da missão selecionad*/}
      {missaoSelecionada && (
        <MissaoModal
          missao={missaoSelecionada}
          onClose={() => setMissaoSelecionada(null)} //fecha modal
          onConcluir={() => concluirMissao(missaoSelecionada.id)} //marca missão concluida
        />
      )}
    </section>
  );
}
