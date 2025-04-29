import { useState } from 'react';
import styles from '../styles/Register.module.css';
import { useAuthentication } from '../hooks/useAuthentication';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [displayEmail, setEmail] = useState('');
    const [displayPassword, setPassword] = useState('');
    const [displayConfirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (displayPassword !== displayConfirm) {
            setError("As senhas precisam ser iguais!");
            return;
        }
        const res = await createUser(user)

        const user = {
            displayName,
            displayEmail,
            displayPassword
        };

        console.log(user);
    };

    return (
        <div className={styles.div_register}>
            <h2>Cadastre-se para ter Acesso ao Site</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="Nome do Usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="displayEmail"
                        required
                        placeholder="E-mail"
                        value={displayEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="displayPassword"
                        required
                        placeholder="Senha"
                        value={displayPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    <span>Confirmar Senha:</span>
                    <input
                        type="password"
                        name="displayConfirm"
                        required
                        placeholder="Repetir Senha"
                        value={displayConfirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.btnCadastrar}>Cadastrar</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
