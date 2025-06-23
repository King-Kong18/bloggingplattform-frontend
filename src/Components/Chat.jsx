import React, { useEffect, useState } from "react";
import '../Styles/chat-style.css';
import Header from "./HeaderIfLoggedIn";

function Chat({ username, benutzerId }) {
    const [recipientId, setRecipientId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then(data => setUsers(data.filter(u => u.id !== benutzerId)))
            .catch(err => console.error("Fehler beim Laden der Nutzer", err));
    }, [benutzerId]);

    useEffect(() => {
        if (recipientId) {
            fetch(`http://localhost:8080/messages?user1=${benutzerId}&user2=${recipientId}`)
                .then(res => res.json())
                .then(setMessages)
                .catch(err => console.error("Fehler beim Laden der Nachrichten", err));
        }
    }, [recipientId, benutzerId]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!recipientId || !message.trim()) return;

        const payload = {
            senderId: benutzerId,
            recipientId: recipientId,
            content: message
        };

        try {
            const res = await fetch("http://localhost:8080/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setMessage("");
                // Re-fetch messages
                const refreshed = await fetch(`http://localhost:8080/messages?user1=${benutzerId}&user2=${recipientId}`);
                const data = await refreshed.json();
                setMessages(data);
            }
        } catch (err) {
            console.error("Fehler beim Senden", err);
        }
    };

    return (
        <>
            <Header />
            <div className="chat-container">
                <h2>Chatte mit anderen Nutzern!</h2>

                <div className="chat-users">
                    <label htmlFor="recipient-select">Chatpartner auswählen:</label>
                    <div className="custom-select-wrapper">
                        <select
                            id="recipient-select"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                        >
                            <option value="">Chatpartner wählen</option>
                            {users.map(user => {
                                const hasMessage = messages.some(msg => msg.sender.id === user.id);
                                return (
                                    <option key={user.id} value={user.id}>
                                        {user.username} {hasMessage ? "📨" : ""}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                {recipientId && (
                    <>
                        <div className="chat-box">
                            {messages.length === 0 && <p className="no-messages">Noch keine Nachrichten.</p>}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`chat-message ${msg.sender.id === benutzerId ? "sent" : "received"}`}
                                >
                                    <strong>{msg.sender.username}:</strong> {msg.content}
                                    <div className="chat-time">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                                </div>
                            ))}
                        </div>

                        <form className="chat-form" onSubmit={sendMessage}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Nachricht eingeben..."
                            />
                            <button type="submit">Senden</button>
                        </form>
                    </>
                )}
            </div >
        </>



    );
}

export default Chat;
