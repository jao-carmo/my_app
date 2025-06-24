import React, { useState } from 'react';
import '../styles/Brand.module.css'; // Se quiser, renomeie também para Brands.module.css

export default function Brands() {
    const [nome, setNome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Marca cadastrada:', nome);
        setNome('');
    };

    return (
        <div className="container">
            <h2>Cadastro de Marca</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <div>
                    <label htmlFor="nome">Nome da Marca:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
