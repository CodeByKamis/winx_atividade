
import { Routes, Route } from "react-router-dom"; //serve pra criar as rota
import { Inicial } from "../Paginas/Inicial"; //importanto a tela incial
import { Winx } from "../Paginas/Winx"; //tela principal
import { Missao } from "../Paginas/Missao"; //missoes


//organizando as rotas do projeto
export function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/winx" element={<Winx />} >  
                <Route index element ={<Winx/>}/>
                <Route path="missao" element={<Missao />} /> 
            </Route>   
        </Routes>
    );
}   