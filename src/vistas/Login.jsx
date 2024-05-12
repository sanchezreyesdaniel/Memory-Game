import { useContext, useState} from "react"
import { usersData } from "../data/usersData"
import { ContextoGlobal } from "../context/GlobalContext.jsx"
import { useNavigate } from "react-router-dom"
// import { supabase } from "../supabase/supabase.jsx"
import { supabase } from "../supabase/supabase.jsx"

export function Login(){

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const { setUsuario } = useContext(ContextoGlobal)
    const navigate = useNavigate()

    function controladorEmail(e){
        setEmail(e.target.value)
    }

    function controladorPassword(e){
        setPassword(e.target.value)
    }

    async function inicioSesion(){
        try {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if(error) throw new Error('Error en el login' + error.message)
            setUsuario({
                email: data.user.email
            })
            console.log('data de login', data)

            // Navegar a la página de juego después de iniciar sesión
            navigate('/juego');
        } catch (error) {
            console.log('Error en login', error)
        }
    }

    function controladorSubmit(e){
        e.preventDefault()
        inicioSesion()
    }

    return(
        <div>
            <h1>Inicio de sesión</h1>
            <form onSubmit={controladorSubmit} className="w-[400px] border mx-auto mt-10 p-5 bg-slate-200 shadow">
                <input 
                onChange={controladorEmail}
                value={email}
                type="text" className="w-full p-2" placeholder="email@email.com"/>
                <input 
                onChange={controladorPassword}
                value={password}
                type="password" placeholder="Contraseña" className="w-full p-2 mt-3"/>
                <button type="submit" className="w-full border mt-3 bg-green-400 p-3">Iniciar sesión</button>
            </form>
        </div>
    )
}