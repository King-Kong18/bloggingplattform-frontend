import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../Styles/profile-style.css';
import Header from './HeaderIfLoggedIn';

function Profile({ username, benutzerId, password, onLogout }) {
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState(username);
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const passwordToSend = newPassword.trim() === "" ? password : newPassword;

        const updateData = {
            username: newUsername,
            password: passwordToSend,
        };

        try {
            const response = await fetch(`http://localhost:8080/users/${benutzerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    const errData = await response.json();
                    setErrorMessage(errData.message || "Benutzername ist bereits vergeben.");
                } else {
                    const errData = await response.json();
                    throw new Error(errData.message || "Fehler beim Aktualisieren des Kontos");
                }
                return;
            }

            setNewPassword("");
            navigate("/start");
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Willst du dein Konto wirklich löschen? Alle deine Blogs werden auch gelöscht!")) return;

        try {
            const response = await fetch(`http://localhost:8080/users/${benutzerId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Fehler beim Löschen des Kontos");
            }

            onLogout();
            navigate("/");
        } catch (err) {
            alert("Fehler: " + err.message);
        }
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                <h2>Profil bearbeiten</h2>
                <form onSubmit={handleUpdate} className="profile-form">
                    <label>Benutzername</label>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />

                    <label>Neues Passwort (optional)</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leer lassen, um Passwort beizubehalten"
                    />

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="btn-update">Profil aktualisieren</button>
                </form>

                <button onClick={handleDelete} className="btn-delete">
                    Konto löschen
                </button>
            </div>
        </>
    );
}

export default Profile;
