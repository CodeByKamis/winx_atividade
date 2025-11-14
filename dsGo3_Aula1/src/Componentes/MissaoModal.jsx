// //importa hooks e imagens de feedback
// import { useState, useEffect, useRef } from "react";
// import sucesso from "../assets/winx_acertou.png";
// import erro from "../assets/winx_errou.png";

// //modal da missão
// export function MissaoModal({ missao, onClose, onConcluir, triggerRef }) {
//   //estado da resposta e resultado
//   const [resposta, setResposta] = useState("");
//   const [resultado, setResultado] = useState(null);
//   const [status, setStatus] = useState(null);
//   const inputRef = useRef(null); 
//   const dialogRef = useRef(null); 
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   //fecha modal e devolve foco pra quem abriu
//   const handleClose = () => {
//     onClose();
//     triggerRef?.current?.focus();
//   };

//   //verifica se a resposta ta certa
//   const verificarResposta = () => {
//     if (!resposta.trim()) return alert("ATENÇÃO\nDigite sua resposta antes de enviar");

//     if (resposta.trim().toLowerCase() === missao.respostaCorreta.trim().toLowerCase()) {
//       setResultado("resposta certa! parabéns winx");
//       setStatus("sucesso");
//       setTimeout(() => onConcluir(missao.id), 1000);
//     } else {
//       setResultado("errou, tenta de novo");
//       setStatus("erro");
//     }
//   };

//   return (
//     <dialog
//       ref={dialogRef}
//       open
//       className="modal"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby={`titulo-missao-${missao.id}`}
//       aria-describedby={`descricao-missao-${missao.id}`}
//       tabIndex={-1}
//     >
//       {/*titulo e descricao*/}
//       <h2 id={`titulo-missao-${missao.id}`}>{missao.titulo}</h2>
//       <p id={`descricao-missao-${missao.id}`}>{missao.descricao}</p>

//       {/*input de resposta*/}
//       <label className="digite_resposta" htmlFor={`resposta-${missao.id}`}>digite sua resposta</label>
//       <input
//       className="caixaTexto"
//         ref={inputRef}
//         id={`resposta-${missao.id}`}
//         type="text"
//         placeholder="digite sua resposta..."
//         value={resposta}
//         onChange={(e) => setResposta(e.target.value)}
//         required
//         aria-label={`resposta para a missão ${missao.titulo}`}
//       />

//       {/*botoes*/}
//       <div className="modal-botoes">
//         <button onClick={verificarResposta}>enviar</button>
//         <button onClick={handleClose}>fechar</button>
//       </div>

//       {/*figurinhas de certo e errado pra resposta*/}
//       {resultado && (
//         <div className="resultado" aria-live="polite" role="status">
//           <p>{resultado}</p>
//           {status === "sucesso" && <img src={sucesso} alt="missão concluída" width={100} height={100} />}
//           {status === "erro" && <img src={erro} alt="resposta errada" width={100} height={100} />}
//         </div>
//       )}
//     </dialog>
//   );
// }
import { useState, useEffect, useRef } from "react";
import sucesso from "../assets/winx_acertou.png";
import erro from "../assets/winx_errou.png";

//modal da missão
export function MissaoModal({ missao, onClose, onConcluir, triggerRef }) {
  //estados
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 🔥 salva figurinha no inventário SEM mexer no CSS
  const salvarFigurinha = (tipo) => {
    const novaFigurinha = {
      id: Date.now(),
      nome: tipo === "sucesso" ? "Acertou a missão" : "Errou a missão",
      imagem: tipo === "sucesso" ? sucesso : erro,
      missao: missao.titulo,
    };

    const inventarioAtual = JSON.parse(localStorage.getItem("inventario")) || [];
    inventarioAtual.push(novaFigurinha);
    localStorage.setItem("inventario", JSON.stringify(inventarioAtual));
  };

  //fecha modal
  const handleClose = () => {
    onClose();
    triggerRef?.current?.focus();
  };

  //verifica resposta
  const verificarResposta = () => {
    if (!resposta.trim())
      return alert("ATENÇÃO\nDigite sua resposta antes de enviar");

    const acertou =
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase();

    if (acertou) {
      setResultado("resposta certa! parabéns winx");
      setStatus("sucesso");

      salvarFigurinha("sucesso"); // ⭐ figurinha de acerto

      setTimeout(() => onConcluir(missao.id), 1000);
    } else {
      setResultado("errou, tenta de novo");
      setStatus("erro");

      salvarFigurinha("erro"); // ⭐ figurinha de erro
    }
  };

  return (
    <dialog
      ref={dialogRef}
      open
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`titulo-missao-${missao.id}`}
      aria-describedby={`descricao-missao-${missao.id}`}
      tabIndex={-1}
    >
      {/*titulo e descricao*/}
      <h2 id={`titulo-missao-${missao.id}`}>{missao.titulo}</h2>
      <p id={`descricao-missao-${missao.id}`}>{missao.descricao}</p>

      {/*input de resposta*/}
      <label
        className="digite_resposta"
        htmlFor={`resposta-${missao.id}`}
      >
        digite sua resposta
      </label>

      <input
        className="caixaTexto"
        ref={inputRef}
        id={`resposta-${missao.id}`}
        type="text"
        placeholder="digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        required
        aria-label={`resposta para a missão ${missao.titulo}`}
      />

      {/*botoes*/}
      <div className="modal-botoes">
        <button onClick={verificarResposta}>enviar</button>
        <button onClick={handleClose}>fechar</button>
      </div>

      {/*figurinhas de certo e errado*/}
      {resultado && (
        <div className="resultado" aria-live="polite" role="status">
          <p>{resultado}</p>
          {status === "sucesso" && (
            <img
              src={sucesso}
              alt="missão concluída"
              width={100}
              height={100}
            />
          )}
          {status === "erro" && (
            <img
              src={erro}
              alt="resposta errada"
              width={100}
              height={100}
            />
          )}
        </div>
      )}
    </dialog>
  );
}
