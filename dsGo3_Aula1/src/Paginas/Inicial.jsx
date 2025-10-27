import logo from '../assets/winxlogo.png'; // logo
import { useNavigate } from 'react-router-dom'; //hook pra mudar de pg

export function Inicial() {
  const navigate = useNavigate(); //guarda função de navegcao

  return (
    <main 
      className="inicial" 
      role="main" //indica área principal
      aria-label="Página inicial das Winx" //acessibilidade
    >
      {/*logo winx*/}
      <img
        src={logo}
        className="logo"
        alt="logo das Winx"
        loading="lazy" //só carrega quando aparece na tela
        decoding="async" //decodifica sem travar a renderização
      />
      {/* botao pra entrar */}
      <button
        onClick={() => navigate('/winx')}
        className="entrar"
        aria-label="Entrar no site Winx"
      >
        Entrar
      </button>
    </main>
  );
}
