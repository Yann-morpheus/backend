import { Send, Settings, X } from "lucide-react";
import MessageContainer from "../components/MessageContainer";
import ReceiverMessageContainer from "../components/ReceiverMessageContainer";
import SenderMessageContainer from "../components/SenderMessageContainer";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const ChatPage = () => {
    const navigation = useNavigate();
    const socketRef = useRef(null);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showNavbar, setShowNavbar] = useState(false);
    const [usersConnected, setUsersConnected] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);

    const pseudo = sessionStorage.getItem('userPseudo');

    useEffect(() => {
        if (!pseudo) {
            navigation('/');
            return;
        }

        socketRef.current = io("http://localhost:3000");
        const socket = socketRef.current;

        socket.on('message_recu', (data) => {
            setMessages((prev) => [...prev, data]);
            setTotalMessages(data.totalMessages);
        });

        socket.on('nombre_user_connecter', (nombre) => {
            setUsersConnected(nombre);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const envoyerMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        socketRef.current.emit('message_envoyer', { pseudo, message });
        setMessage('');
    };

    return (
        <div className='flex flex-col h-dvh overflow-hidden'>
            <div className='border-b border-b-gray-200 py-2 px-2 shadow-xl flex justify-between items-center'>
                <div className='flex flex-col gap-0.5'>
                    <h1 className='text-2xl '><span className="font-semibold text-primary-color">VEIL</span>ROOM</h1>
                    <h5 className='text-gray-300 font-semibold text-xs'>
                        {usersConnected} utilisateurs connecté | {totalMessages} messages envoyés
                    </h5>
                </div>
            </div>

            <MessageContainer>
                {messages.map((msg, index) => (
                    msg.pseudo === pseudo ? (
                        <SenderMessageContainer
                            key={index}
                            nom={msg.pseudo}
                            contenue={msg.message}
                        />
                    ) : (
                        <ReceiverMessageContainer
                            key={index}
                            nom={msg.pseudo}
                            contenue={msg.message}
                        />
                    )
                ))}
            </MessageContainer>

            <form
                onSubmit={envoyerMessage}
                className='w-full flex gap-2 px-2 py-2 bg-white'
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='bg-white focus:border-primary-color border-gray-200 rounded-lg border-2 shadow-xs px-1 py-2 outline-none w-full'
                />
                <button
                    type='submit'
                    className='rounded-full flex items-center justify-center bg-primary-color px-2'
                >
                    <Send className='w-7 text-white' />
                </button>
            </form>
        </div>
    );
};

export default ChatPage;