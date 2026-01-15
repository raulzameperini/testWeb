import  { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export interface ILoginNavigateState{
    username: string;
}

export default function Login(){
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        console.log("form inviate");

        const stateObj: ILoginNavigateState = {
            username: username
        }
        navigate(`/DashBoard/`, {
            state: stateObj

            });
    }
    return (
       <form onSubmit={handleSubmit}
        >
        <h1>Login Form</h1>
        <input
        type="text" 
        placeholder="Inserisci nome utente o email"
        value={username}
        onChange={(event) =>
            setUsername(event.target.value)
        }
        />
        <p>Nome Username: {username}</p>
        <button type="submit">Submit</button>
       </form>
    
    )
}
