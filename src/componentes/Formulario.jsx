import React, { useState, useContext } from 'react';
import { ContextoGlobal } from '../context/GlobalContext';
import { supabase } from '../supabase/supabase.jsx';

export function Formulario() {
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');
  const { usuario } = useContext(ContextoGlobal);
  const { contadorGlobal, setContadorGlobal, incrementarContadorGlobal,
    puntuacion, setPuntuacion,
    compararPersonajes, setCompararPersonajes,
    tiempo, setTiempo,
    base, setBase,
    juego, setJuego  } = useContext(ContextoGlobal);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (nombre.trim() === '') {
      setMessage('Por favor, introduce un nombre válido.');
    } else {
      try {
        const horaActual = new Date().toLocaleString(); // Obtiene la hora actual en formato de cadena de texto

        const { data, error } = await supabase
          .from('Ranking')
          .insert([
            { nombre, clicks: contadorGlobal,puntuacion, email: usuario.email, hora: horaActual }
          ]);

        if (error) {
          throw error;
        }

        setMessage(`¡Gracias por jugar, ${nombre}!`);
      } catch (error) {
        console.error('Error al insertar en Supabase:', error.message);
        setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  const handleRestart = () => {
    setNombre('');
    setMessage('');
    window.location.reload(); // Recargar la página
  };

  return (
    <div className="container mx-auto mt-10 max-w-md p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Game Over</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Enviar</button>
      </form>
      <button onClick={handleRestart} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-400">Reiniciar</button>
      {message && <p id="message" className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
