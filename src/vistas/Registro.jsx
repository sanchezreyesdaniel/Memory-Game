import { useContext, useState } from 'react';
// import { usersData } from '../data/usersData';
import { ContextoGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

export function Registro(){

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const { setUsuario } = useContext(ContextoGlobal)
    const [nombre, setNombre] = useState('') 
    const [apellido, setApellido] = useState('') 
    const navigate = useNavigate()

    function controladorEmail(e){
        setEmail(e.target.value)
    }

    function controladorPassword(e){
        setPassword(e.target.value)
    }

    function controladorNombre(e){
        setNombre(e.target.value)
    }

    function controladorApellido(e){
        setApellido(e.target.value)
    }

    async function registro(){
        console.log("Email:", email); 
        try {
            
            if (password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }

            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            console.log("Datos de registro:", data); 
            console.log("Error:", error); 

            
            if (data.user) {
                const { data: usu, error: errorCrearUsu } = await supabase
                    .from('Memory Usuarios')
                    .insert({
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        userid: data.user.id
                    })
                    .select()

                if (errorCrearUsu) throw new Error('Error en el login' + errorCrearUsu.message)
                setUsuario({
                    email: data.user.email
                })
            }
        } catch (error) {
            console.log('Error en registro:', error)
        }
    }

    function controladorSubmit(e){
        e.preventDefault()
        registro()
        navigate('/login')
    }

    return(
        <div>
            
            <form onSubmit={(e)=>{controladorSubmit(e)}} className="w-[400px] border mx-auto mt-10 p-5 bg-slate-200 shadow">
                <input 
                    onChange={(e)=>{
                        controladorEmail(e)
                    }}
                    value={email}
                    type="text" className="w-full p-2" placeholder="email@email.com"/>
                <input 
                    onChange={(e)=>{
                        controladorPassword(e)
                    }}
                    value={password}
                    type="password" placeholder="Contraseña" className="w-full p-2 mt-3"/>
                <input 
                    onChange={(e)=>{
                        controladorNombre(e)
                    }}
                    value={nombre}
                    type="text" className="w-full p-2 mt-3"
                    placeholder="Nombre"/>
                <input 
                    onChange={(e)=>{
                        controladorApellido(e)
                    }}
                    value={apellido}
                    type="text" className="w-full p-2 mt-3"
                    placeholder="Apellido"/>
                <button className="w-full border mt-3 bg-green-400 p-3">Registrarse</button>
            </form>
        </div>
    )
}