import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase.jsx';

export function VistaRanking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRanking() {
      try {
        const { data, error } = await supabase
          .from('Ranking')
          .select('nombre, puntuacion, email, hora2, clicks')
          .order('puntuacion', { ascending: false });

        if (error) {
          throw error;
        }

        setRanking(data || []);
      } catch (error) {
        console.error('Error al obtener el ranking:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Ranking</h1>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Puntuación</th>
                <th className="px-4 py-2">Hora</th>
                <th className="px-4 py-2">Clicks</th>
                <th className="px-4 py-2">Correo</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((registro, index) => (
                <tr key={index} className={index === 0 ? "bg-green-400" : (index % 2 === 0 ? "bg-gray-200" : "")}>
                  <td className="border px-4 py-2">{registro.nombre}</td>
                  <td className="border px-4 py-2">{registro.puntuacion}</td>
                  <td className="border px-4 py-2">{registro.hora2}</td>
                  <td className="border px-4 py-2">{registro.clicks}</td>
                  <td className="border px-4 py-2">{registro.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
