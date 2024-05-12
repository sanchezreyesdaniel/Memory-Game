import { createContext, useState } from "react";

// Creamos el contexto (la bolsa donde meter los estados)
export const ContextoGlobal = createContext();

// Creamos el proveedor del contexto
export function ContextoGlobalProvider({ children }){

    const [contadorGlobal, setContadorGlobal] = useState(0);
    const [puntuacion, setPuntuacion] = useState(0);
    const [compararPersonajes, setCompararPersonajes] = useState([]);
    const [base, setBase] = useState([]);
    const [tiempo, setTiempo] = useState(20);
    const [juego, setJuego] = useState(false)
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    })
    const incrementarContadorGlobal = () => {
      setContadorGlobal(contadorGlobal + 1);
    };

    return(
        <ContextoGlobal.Provider value={{
            contadorGlobal, setContadorGlobal, incrementarContadorGlobal,
            puntuacion, setPuntuacion,
            compararPersonajes, setCompararPersonajes,
            tiempo, setTiempo,
            base, setBase,
            juego, setJuego,
            usuario, setUsuario

        }}>
            {children}
        </ContextoGlobal.Provider>
    );
}
