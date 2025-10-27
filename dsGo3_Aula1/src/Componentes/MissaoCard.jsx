export function MissaoCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article className="missao-card">
      {/*titulo da missao*/}
      <h3 className="missao-titulo">{missao.titulo}</h3>

      {/*descrição da missao*/}
      <p className="missao-descricao">{missao.missao}</p>

      {/*botaozin*/}
      <button
        type="button"
        onClick={() => onIniciarMissao(missao)}
        disabled={concluida}
        aria-pressed={concluida}
        aria-disabled={concluida}
        aria-label={
          concluida
            ? `Missão ${missao.titulo} já concluída`
            : `Iniciar missão ${missao.titulo}`
        }
        title={concluida ? "Missão concluída" : "Iniciar missão"}
      >
        {concluida ? "Missão concluída" : "Iniciar Missão"}
      </button>
    </article>
  );
}
