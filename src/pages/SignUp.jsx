import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = e.currentTarget

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contact: formData.contact.value,
                pseudo: formData.pseudo.value
            })
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json()
                sessionStorage.setItem('userPseudo', data.pseudo)   // ← d'abord
                sessionStorage.setItem('userContact', data.contact) // ← ensuite
                navigate('/chat')                                    // ← puis naviguer
            } else {
                const msg = await response.text()
                setError(msg || "Échec de l'inscription")
            }
        })
    }
    return (
        <div className=" flex flex-col px-5 h-[80vh] justify-center gap-5 items-center ">
            <div className="flex flex-col gap-2 items-center justify-center">
                <h1 className="text-xl">Créer un compte sur <span className="text-primary-color font-semibold ">VEIL</span>ROOM</h1>
                <h2 className="italic text-xs font-semibold">"L'anonymat au service de la vie "</h2>
            </div>
            <form className="flex flex-col gap-5 w-full" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col gap-1">
                    <h1>Pseudo <span className="text-red-500">*</span></h1>
                    <input type="text" name="pseudo" className="border-2 border-gray-200  rounded-lg px-2 py-2 outline-none focus:border-primary-color focus:border-2 " required />
                </div>
                <div className="flex flex-col gap-1">
                    <h1>Contact <span className="text-red-500">*</span></h1>
                    <input type="number" name="contact" className="border-2 border-gray-200 rounded-lg px-2 py-2 outline-none focus:border-primary-color focus:border-2 " required />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <input type="submit" value={"S'inscrire"} className=" text-white bg-primary-color p-2 rounded-lg w-full  transition-transform duration-150 active:scale-95  " />
            </form>
            <div>Vous avez déjà un compte ? <Link to={'/'} className=" ml-1 font-bold text-primary-color"> Cliquer ici</Link></div>

        </div>
    );
}

export default SignUp;