import { useState } from "react";
import "./style.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

function Home() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate();


    async function handleLogin(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
        
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                //navegar para o /Admin
                navigate("/admin", { replace: true })
            })
            .catch((error)=>{
                console.log(error)
            })

        }else{
            toast.error("Os Campos não fora preenchidos corretamentes!")
            console.log("Preencha todos os campos")
        }

    }

    return (
        <div className="Home-Conteiner">
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agernda de forma fácil</span>

            <form className="Form" onSubmit={handleLogin}>
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

                <button type="submit">Acessar</button>
            </form>

            <Link className="Button-Link" to="/register">
                Não possui uma conta? Cadastre-se
            </Link>
        </div>
    );
}

export default Home;
