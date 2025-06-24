import React, { useState } from 'react';
import '../styles/Products.module.css'
export default function Products() {
    const [nome, setNome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Produto cadastrado:', nome);
        setNome('');
    };

    return (
        <div className="container">
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <div>
                    <label htmlFor="nome">Nome do Produto:</label>
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
