import React from "react";
import styles from "../styles/Login.module.css";

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Login</h2>
                <form className={styles.form}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
