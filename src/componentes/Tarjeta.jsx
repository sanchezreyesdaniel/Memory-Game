import React, { useContext, useState, useEffect } from "react";
import { ContextoGlobal } from "../context/GlobalContext.jsx";

export function Tarjeta({ id }) {
    const { contadorGlobal, setContadorGlobal, incrementarContadorGlobal,
        puntuacion, setPuntuacion,
        compararPersonajes, setCompararPersonajes,
        tiempo, setTiempo,
        base, setBase,
        juego, setJuego  } = useContext(ContextoGlobal);

    const [contador, setContador] = useState(0);

    const [volteada, setVolteada] = useState(false);
    
    const [idSeleccionados, setIdSeleccionados] = useState([]);
    const [idCorrectos, setIdCorrectos] = useState([]);
    const [bloquearClics, setBloquearClics] = useState(false); // Nuevo estado para bloquear los clics

    const pokemon = base.find(pokemon => pokemon.id === id);

    useEffect(() => {
        let temporizador;
        if (compararPersonajes.length === 2) {
            console.log(compararPersonajes)
            if (compararPersonajes[0] === compararPersonajes[1]) {

                const coincidencia = compararPersonajes[0]
                // Si son iguales, dejarlas volteadas
                
                setIdCorrectos([...idCorrectos,coincidencia])
                setPuntuacion(puntuacion + 20 )

                // setIdSeleccionados([])
                // setVolteada(true);
            } else {
                // Si son diferentes, voltearlas nuevamente
                console.log("Tarjetas diferentes. Volteando nuevamente...");
                temporizador = setTimeout(() => {
                    if(!idCorrectos.includes(id)){
                        setVolteada(false)
                    }
                }, 1500);
            }
            setTimeout(() => {
                setCompararPersonajes([]);
                setBloquearClics(false);
            }, 1500);
        }
    }, [compararPersonajes]); // <- Corregimos aquí, ahora se ejecutará correctamente cuando idSeleccionados cambie
    
    const handleClick = () => {
        if (contadorGlobal === 0) {
            // Si es el primer clic, inicia el temporizador
            iniciarTemporizador();
        }
        if (compararPersonajes.length < 2 && !volteada && !bloquearClics) {
            incrementarContadorGlobal();
            setContador(contador + 1);
            setVolteada(true);
            console.log("ID seleccionado:", id);
            setCompararPersonajes([...compararPersonajes, id]);
        }
    };
    


    
    useEffect(() => {
        if (contadorGlobal === 1) {
            // Si es el primer clic, inicia el temporizador
            iniciarTemporizador();
        }
    }, [contadorGlobal]); // Se ejecuta cada vez que contadorGlobal cambia
    
    const iniciarTemporizador = () => {
        let tiempoRestante = 20; // Tiempo inicial en segundos
    
        const intervalo = setInterval(() => {
            if (tiempoRestante <= 0) {
                // Si el tiempo llega a cero, detener el temporizador
                clearInterval(intervalo);
                console.log('Partida Acabada');
                // Recargar la página después de 1 segundo
                setTimeout(() => {
                   // window.location.reload();
                }, 1000);
            } else {
                // Si el tiempo es mayor que cero, disminuirlo en 1 segundo
                tiempoRestante--;
                setTiempo(tiempoRestante);
            }
        }, 1000); // Se ejecuta cada segundo
    };
    
    

    return (
        <div className="tarjeta bg-slate-50 bg-opacity-50">
            <div onClick={handleClick} id={id} className="min-h-[300px] max-w-sm rounded overflow-hidden shadow-lg">
                {volteada ? (
                    <>
                        <img className="w-[300px] h-[190px]" src={pokemon.imagen} alt={pokemon.nombre} />
                        <div className="px-6 py-4">
                            <div className=" text-xl mb-2">{pokemon.nombre}</div>
                            <p>Clicks: {contador}</p>
                        </div>
                    </>
                ) : (
                    <img className="w-[300px] h-[300px]" src="https://tcg.pokemon.com/assets/img/global/tcg-card-back.jpg" alt="Dorso" />
                )}
            </div>
        </div>
    );
}
