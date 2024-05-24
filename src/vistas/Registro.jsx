import { useContext, useState } from 'react';
import { ContextoGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

export function Registro() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const { setUsuario } = useContext(ContextoGlobal);
    const [nombre, setNombre] = useState(''); 
    const [apellido, setApellido] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function controladorEmail(e) {
        setEmail(e.target.value);
    }

    function controladorPassword(e) {
        setPassword(e.target.value);
    }

    function controladorNombre(e) {
        setNombre(e.target.value);
    }

    function controladorApellido(e) {
        setApellido(e.target.value);
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    async function registro() {
        console.log("Email:", email); 
        try {
            if (!email || !password || !nombre || !apellido) {
                throw new Error('Todos los campos son obligatorios.');
            }

            if (!validarEmail(email)) {
                throw new Error('El correo electrónico no tiene un formato válido.');
            }

            if (password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres.');
            }

            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            console.log("Datos de registro:", data); 
            console.log("Error:", error); 

            if (error) {
                throw error;
            }

            if (data.user) {
                const { data: usu, error: errorCrearUsu } = await supabase
                    .from('Memory Usuarios')
                    .insert({
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        userid: data.user.id
                    })
                    .select();

                if (errorCrearUsu) throw new Error('Error en la creación del usuario: ' + errorCrearUsu.message);
                
                setUsuario({
                    email: data.user.email
                });
            }
        } catch (error) {
            console.log('Error en registro:', error);
            setError(error.message);
        }
    }

    function controladorSubmit(e) {
        e.preventDefault();
        registro();
        navigate('/login');
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
                <input 
                    onChange={controladorNombre}
                    value={nombre}
                    type="text" 
                    className="w-full p-2 mt-3" 
                    placeholder="Nombre" 
                    required
                />
                <input 
                    onChange={controladorApellido}
                    value={apellido}
                    type="text" 
                    className="w-full p-2 mt-3" 
                    placeholder="Apellido" 
                    required
                />
                <button className="w-full border mt-3 bg-green-400 p-3">Registrarse</button>
            </form>
        </div>
    );
}
