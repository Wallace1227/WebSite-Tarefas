import { useState, useEffect } from 'react';
import './style.css';

import { toast } from 'react-toastify';
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState({});

    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas")
                //Criação da query
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                //propriedade que fica chamando a query
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista);
                })
            }

        }
        loadTarefas()
    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        if (tarefaInput === '') {
            toast.warning("Necessário digitar uma tarefa para poder salvar")
            return;
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
        })
            .then(() => {
                toast.success("Tarefa Cadastrada Com Sucesso")
                setTarefaInput("")
            })
            .catch((error) => {
                toast.error(error)
                console.log(error)
            })
    }

    async function handleLogout() {
        await signOut(auth)

    }

    async function deletarTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)

        .then(() => {
            toast.success("Tarefa Concluída Com Sucesso")
        })
        .catch((error) => {
            toast.error(error)
            console.log(error)
        })
    }

    function editTarefa(item){
        setTarefaInput(item.tarefa);
        setEdit(item);
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() =>{ 
            toast.success("Tarefa Atualizada Com Sucesso")
            setTarefaInput('')
            setEdit({})
        })
        .catch((error) =>{
            toast.error(error)
            console.log("Erro")
            setTarefaInput('')
            setEdit({})
        })
    }

    return (
        <div className='Admin-Conteiner'>
            <h1>Minhas Tarefas</h1>

            <form className="Form" onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite sua tarefa'
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className="btn-register" type='submit'>Atualizar Tarefa</button>
                ) : (
                    <button className="btn-register" type='submit'>Registrar Tarefa</button>
                )}
            </form>

            {tarefas.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.tarefa}</p>

                    <div>
                        <button onClick={ () => editTarefa(item)} >Editar</button>
                        <button onClick={ () => deletarTarefa(item.id)} className="btn-delete">Concluir</button>
                    </div>
                </article>
            ))}

            <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
    )
} 