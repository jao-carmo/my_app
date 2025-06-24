import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) throw new Error("Operação cancelada");
    }

    // Criar usuário
    const createUser = async (data) => {
        try {
            setLoading(true);
            setError(null);

            const { user } = await createUserWithEmailAndPassword(
                auth, data.displayEmail, data.displayPassword
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            return user;
        } catch (error) {
            let systemErrorMessage;
            console.log(error);
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro - Tente Novamente";
            }

            setError(systemErrorMessage);
        } finally {
            setLoading(false);
            navigate("/login");
        }
    };

    // Login
    const login = async (email, senha) => {
        setLoading(true);
        try {
            let user;
            await signInWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    user =  userCredential;
                })
                .catch((error) => {
                    setError("Erro ao fazer login. Verifique suas credenciais.");
                });
                return user;
        } catch (error) {
            setError(error); // Use o erro correto aqui
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        login,
        error,
        loading
    };
};
