// as imagens do menu
import missaoImg from '../assets/missoes_winx.png';
import mapa from '../assets/map_winx.png';
import bau from '../assets/bau_winx.png';
import camera from '../assets/camera_winx.png';
import { Link, useLocation } from 'react-router-dom'; //rotas

export function Menu() {
  const location = useLocation();//guarda o estado da rota atual pra saber qual item do menu está ativo

  // define os itens do menu com label é bom para o desempenho do codigo
  const menuItems = [
    { label: "Missões", to: "/winx/missao", img: missaoImg, alt: "ícone de missões winx", isLCP: true },
    { label: "Inventário", to: "/winx", img: bau, alt: "ícone de inventário winx" },
    { label: "Localização", to: "/winx", img: mapa, alt: "ícone de localização winx" },
    { label: "Câmera", to: "/winx", img: camera, alt: "ícone da câmera wixn" },
  ];

  return (
    <nav className="menu" role="navigation" aria-label="menu das Winx">
      {/* lista de itens do menu, deixei como menubar pra acessibilidade do codigo*/}
      <ul role="menubar" aria-label="opções principais">
        {menuItems.map(({ label, to, img, alt, isLCP }) => {
          const isActive = location.pathname === to;

          return (
            <li key={label} role="none">
              <Link
                to={to}
                role="menuitem"
                aria-label={`Ir para a seção de ${label}`}
                title={label}
                aria-current={isActive ? "page" : undefined}
              >
                <figure aria-labelledby={`caption-${label}`}>
                  <img
                    src={img}
                    alt={alt}
                    width={80}
                    height={80}
                    loading={isLCP ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={isLCP ? "high" : "auto"}
                  />
                  <figcaption id={`caption-${label}`} className="iconesmenu">
                    {label}
                  </figcaption>
                </figure>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
