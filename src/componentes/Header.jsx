import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ContextoGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase/supabase';

export function Header() {
    const navigate = useNavigate();
    const { usuario, setUsuario } = useContext(ContextoGlobal);

    async function logout() {
        try {
            await supabase.auth.signOut();
            setUsuario({});
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    }

    if (!usuario.email) {
        return (
            <div className="container-fluid">
                <ul className='flex'>
                    <li><Link className='border-2 border-black bg-green-400 p-2 m-2' to="/login">LOGIN</Link></li>
                    <li><Link className='border-2 border-black bg-green-400 p-2 m-2' to="/registro">REGISTRO</Link></li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="container-fluid">
                <div className="flex justify-end ">
                    <p className=" p-2 m-2">{usuario.email}</p>
                    <button className="p-2 m-2 border border-black justify-center align-middle bg-red-500" onClick={logout}>Logout</button>
                </div>
                <ul className="flex justify-center">
                    <li className="border-2 border-black p-2 m-2"><Link to="/">HOME</Link></li>
                    <li className="border-2 border-black p-2 m-2"><Link to="/juego">POKEMONS MEMORY</Link></li>
                    <li className="border-2 border-black p-2 m-2"><Link to="/marvelMemory">MARVEL MEMORY</Link></li>
                    <li className="border-2 border-black p-2 m-2"><Link to="/acercade">RANKING</Link></li>
                </ul>
                <h1 className="flex justify-center text-3xl">POKEMONS MEMORY</h1>
            </div>
        );
    }
}
