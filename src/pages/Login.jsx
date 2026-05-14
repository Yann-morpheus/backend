import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = e.currentTarget;
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:
                JSON.stringify({
                    contact: formData.contact.value
                })
        }).then(async (response) => {
            if (response.ok) {
                console.log("Connexion réussie");
                const data = await response.json();
                navigate('/chat')
                console.log("Connexion réussie");
                sessionStorage.setItem('userPseudo', data.pseudo);
                sessionStorage.setItem('userContact', data.contact)
            } else {
                const data = await response.text(); 
                setError(data || "Échec de la connexion");
                console.log("Échec login");
            }
        })
    }

    return (
        <div className="px-4 flex flex-col items-center justify-center h-[80vh] w-full gap-5">
            <div className="flex flex-col gap-2 items-center justify-center"> 
                <h1 className="">Bienvenue sur <span className="text-primary-color font-semibold ">VEIL</span>ROOM</h1>
                <h2 className="italic text-xs font-semibold">"L'anonymat au service de la vie "</h2>
            </div>
            <form action="" className="flex flex-col gap-5 w-full" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col gap-1">
                    <h1>Contact <span className="text-red-500">*</span></h1>
                    <span className="text-xs text-red-500">{error}</span>
                    <input type="number" name="contact" className="border border-gray-200 rounded-lg px-2 py-2 outline-none focus:border-primary-color focus:border-2  " required />
                </div>
                <input type="submit" value={"Se connecter"} className=" text-white bg-primary-color p-2 rounded-lg w-full  transition-transform duration-150 active:scale-95  " />
            </form>
            <div>Vous n'avez pas encore de compte ? <Link to={'/signup'} className=" ml-1 font-bold text-primary-color"> Cliquer ici</Link></div>
        </div>
    );
}

export default Login;