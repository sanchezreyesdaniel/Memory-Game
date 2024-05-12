import React, { useContext } from 'react';
import { Tarjeta } from "./Tarjeta";
import { ContextoGlobal } from '../context/GlobalContext';


export function GrupoTarjetas() {
    
    const { base } = useContext(ContextoGlobal)
    return (
        <>
            <div id="contenedorTarjetas" className="grid grid-cols-6 gap-4">
                {
                    base.map((item) => {
                        return (
                            <Tarjeta key={item.index} id={item.id} imagen={item.image} nombre={item.name}/>
                        )
                    })
                }
            </div>
        </>
    )
}