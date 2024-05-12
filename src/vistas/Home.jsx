import React from 'react';

export function Home() {
    return (
        <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">¡Bienvenido a Pokémon Memory!</h1>
                <p className="text-lg text-center text-gray-600 mb-8">
                    Sumérgete en el emocionante mundo de los Pokémon mientras pones a prueba tu memoria y habilidades de reconocimiento. Prepárate para embarcarte en una aventura llena de diversión y desafíos.
                </p>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿En qué consiste?</h2>
                    <p className="text-lg text-gray-700">
                        Pokémon Memory es un clásico juego de memoria con un giro emocionante: en lugar de cartas normales, ¡estarás emparejando adorables Pokémon! La mecánica es simple pero adictiva: voltea las cartas para encontrar parejas de Pokémon idénticos. Cuantas más parejas encuentres, ¡mayor será tu puntuación!
                    </p>
                </div>
            </div>
        </div>
    );
}
