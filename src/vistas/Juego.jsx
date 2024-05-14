import { useContext, useEffect } from 'react';
import { GrupoTarjetas } from "../componentes/GrupoTarjetas.jsx";
import { ContextoGlobal } from "../context/GlobalContext.jsx";
import  { Formulario } from '../componentes/Formulario.jsx';

export function Juego() {
    const { contadorGlobal, setBase, tiempo, setTiempo, puntuacion, setPuntuacion } = useContext(ContextoGlobal);
    useEffect(() => {
        async function obtenerPokemons() {
            try {
                const obtenerDatosPokemon = Array.from({ length: 9 }, async () => {
                    const id = Math.floor(Math.random() * 898) + 1;
                    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const datosPokemon = await respuesta.json();
    
                    return {
                        id: datosPokemon.id,
                        nombre: datosPokemon.name,
                        imagen: datosPokemon.sprites.front_default,
                        volteada: false,
                    };
                });
    
                const pokemonesProvisionales = await Promise.all(obtenerDatosPokemon);
    
                const array18 = [...pokemonesProvisionales, ...pokemonesProvisionales].map((pokemon, index) => ({
                    ...pokemon,
                    index: index + 1 // Índice basado en 1
                }));
    
                const pokemonesMezclados = array18.sort(() => Math.random() - 0.5);
    
                setBase(pokemonesMezclados); // Actualizamos estado con la lista de pokemones
            } catch (error) {
                console.error('Error al obtener los pokemones', error);
                throw error; // Propagar el error
            }
        }
    
        obtenerPokemons();
    }, [setBase]);
    

    if(tiempo==0){
        return(
            <Formulario></Formulario>
        )
    }
    return (
        <>
            <div className='flex mb-5 mt-10'>
                <h2 className='w-[300px] justify-center border border-black p-4 ' >Contador Global de Clics: {contadorGlobal}</h2>
                <h2 className='w-[300px] justify-center border border-black p-4  ml-10'>Tiempo: {tiempo}</h2>
                <h2 className='w-[300px] justify-center border border-black p-4  ml-10'>Puntos: {puntuacion}</h2>
            </div>
            <GrupoTarjetas />
        </>
    );
}