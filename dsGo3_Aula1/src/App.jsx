
import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './Rotas/Rotas'; 


function App() {
  //para navegar com as rotas
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  )

}
export default App