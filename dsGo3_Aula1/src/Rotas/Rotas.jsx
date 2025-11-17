
import { Routes, Route } from "react-router-dom"; //serve pra criar as rota
import { Inicial } from "../Paginas/Inicial"; //importanto a tela incial
import { Winx } from "../Paginas/Winx"; //tela principal
import { Missao } from "../Paginas/Missao"; //missoes
import { Inventario } from "../Paginas/Inventario"; //missoes
import { Galeria } from "../Paginas/Galeria"; //missoes

//organizando as rotas do projeto
export function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/winx" element={<Winx />} >  
                <Route index element ={<Winx/>}/>
                <Route path="missao" element={<Missao />} /> 
                <Route path="inventario" element={<Inventario />} /> 
                <Route path="galeria" element={<Galeria />} /> 

            </Route>   
        </Routes>
    );
}   