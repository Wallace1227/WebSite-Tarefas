import { useState } from "react";

import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Register() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate();


    async function handleRegister(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/", { replace: true })
                    toast.success("Cadastro Realizado Com Sucesso")

                })
                .catch((error) => {
                    toast.error(error)
                })

        } else {
            toast.error("Os campos não foram preenchidos corretamentes!")
        }

    }

    return (
        <div className="Home-Conteiner">
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta</span>

            <form className="Form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />

                <input
                    autoComplete="false"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>

            <Link className="Button-Link" to="/">
                Já possui uma conta? Faça login!
            </Link>
        </div>
    );
}

export default Register;
