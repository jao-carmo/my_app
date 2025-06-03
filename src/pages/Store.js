import { useState, useEffect } from 'react';
import styles from '../styles/Store.module.css';
import { db } from '../firebase/connection';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Store = () => {
  useEffect(() => {
    document.title = "Cadastrar Loja";
  }, []);

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !endereco || !cidade || !estado) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (estado.length !== 2 || !/^[A-Z]{2}$/.test(estado)) {
      setError("Estado (UF) deve conter 2 letras maiúsculas (ex: SP).");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "lojas"), {
        nome,
        endereco,
        cidade,
        estado,
        criadoEm: Timestamp.now()
      });
      setSuccess("Loja cadastrada com sucesso!");
      setNome('');
      setEndereco('');
      setCidade('');
      setEstado('');
    } catch (err) {
      console.error("Erro ao cadastrar loja:", err);
      setError("Erro ao cadastrar. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.StoreBox}>
        <h2 className={styles.title}>Cadastrar Loja</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da Loja"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="UF (ex: SP)"
            value={estado}
            onChange={(e) => setEstado(e.target.value.toUpperCase())}
            className={styles.input}
            maxLength={2}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Store;
