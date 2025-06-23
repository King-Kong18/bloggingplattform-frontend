import React, { useState } from "react";
import '../Styles/login-style.css';
import DefaultHeader from './DefaultHeader';
import { FaUser, FaLock } from "react-icons/fa";
import { MdLogin, MdAppRegistration } from "react-icons/md";

function LogIn({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Neuer State für Fehler

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Fehler zurücksetzen

    const url = isRegistering
      ? "http://localhost:8080/users"
      : "http://localhost:8080/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (isRegistering && response.status === 409) {
          throw new Error("Benutzername existiert bereits.");
        }

        const message = isRegistering
          ? (await response.json()).message || "Fehler bei der Registrierung."
          : await response.text();

        throw new Error(message);
      }

      const data = await response.json();
      onLogin(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <DefaultHeader />
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>
            {isRegistering ? <MdAppRegistration /> : <MdLogin />}{" "}
            {isRegistering ? "Registrieren" : "Anmelden"}
          </h2>

          <label htmlFor="username">
            <FaUser /> Benutzername
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">
            <FaLock /> Passwort
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isRegistering ? "Jetzt registrieren" : "Jetzt einloggen"}
          </button>

          {/* Fehlermeldung anzeigen */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="toggle-link" onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage(""); // Fehler beim Umschalten zurücksetzen
          }}>
            {isRegistering
              ? "Schon ein Konto? Jetzt anmelden"
              : "Noch kein Konto? Jetzt registrieren"}
          </p>
        </form>
      </div>
    </>
  );
}

export default LogIn;
