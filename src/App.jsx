
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './vistas/Home';
import { Juego } from './vistas/Juego';
import { ContextoGlobalProvider } from './context/GlobalContext';
import { Header } from './componentes/Header';
import { MarvelMemory } from './vistas/MarvelMemory';
import { VistaRanking } from './vistas/Acercade';
import { Login } from './vistas/Login';
import { Registro } from './vistas/Registro';

function App() {
  return (
    <ContextoGlobalProvider>
      <Router>
        <div>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juego" element={<Juego />} />
            <Route path="/marvelMemory" element={<MarvelMemory />} />
            <Route path="/acercade" element={<VistaRanking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </div>
      </Router>
    </ContextoGlobalProvider>
  );
}

export default App;
