import missao from '../assets/missoes_winx.png';
import mapa from '../assets/map_winx.png';
import bau from '../assets/bau_winx.png';
import camera from '../assets/camera_winx.png';
import { Link } from 'react-router-dom'
export function Menu() {
    return (
        <div className='menu'>
            <ul>
                <Link to = 'missao'>
                <li>
                    <figure>
                        <img src={missao} alt="Missões" />
                        <figcaption className='secaonome'>Missões</figcaption>
                    </figure>
                </li>
                </Link>
                
                <li>
                    <figure>
                        <img src={bau} alt="Inventário" />
                        <figcaption className='secaonome'>Inventário</figcaption>
                    </figure>
                    
                </li>
                <li>
                    <figure>
                        <img src={mapa} alt="Localização" />
                        <figcaption className='secaonome'>Localização</figcaption>
                    </figure>
                </li>
                 <li>
                    
                    <figure>
                        <img src={camera} alt="Câmera" />
                        <figcaption className='secaonome'>Câmera</figcaption>
                    </figure>
                    
                </li>
            </ul>
        </div>
    )
}