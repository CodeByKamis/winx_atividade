import { Outlet } from 'react-router-dom';
import { Menu } from '../Componentes/Menu';

export function Winx(){
    return(
        //retornando as informações da tela
        <main className="container">
            <Outlet/>
            <Menu/>            
        </main>

    )
}