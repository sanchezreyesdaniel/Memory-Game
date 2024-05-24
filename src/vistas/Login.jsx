import { useContext, useState } from "react";
import { ContextoGlobal } from "../context/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase.jsx";

export function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const { setUsuario } = useContext(ContextoGlobal);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function controladorEmail(e) {
        setEmail(e.target.value);
    }

    function controladorPassword(e) {
        setPassword(e.target.value);
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    async function inicioSesion() {
        try {
            if (!email || !password) {
                throw new Error('Todos los campos son obligatorios.');
            }

            if (!validarEmail(email)) {
                throw new Error('El correo electrónico no tiene un formato válido.');
            }

            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw new Error('Error en el login: ' + error.message);

            setUsuario({
                email: data.user.email
            });

            console.log('Datos de login', data);
            navigate('/juego');
        } catch (error) {
            console.log('Error en login', error);
            setError(error.message);
        }
    }

    function controladorSubmit(e) {
        e.preventDefault();
        inicioSesion();
    }

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <form onSubmit={controladorSubmit} className="w-[400px] border mx-auto mt-10 p-5 bg-slate-200 shadow">
                <input 
                    onChange={controladorEmail}
                    value={email}
                    type="text" 
                    className="w-full p-2" 
                    placeholder="email@email.com" 
                    required
                />
                <input 
                    onChange={controladorPassword}
                    value={password}
                    type="password" 
                    placeholder="Contraseña" 
                    className="w-full p-2 mt-3" 
                    required
                />
                <button type="submit" className="w-full border mt-3 bg-green-400 p-3">Iniciar sesión</button>
            </form>
        </div>
    );
}
