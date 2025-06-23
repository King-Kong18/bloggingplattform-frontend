import React, { useEffect } from "react";
import '../Styles/logout-style.css';

function Logout({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return (
    <div className="logout-container">
      <h2>Du wurdest ausgeloggt.</h2>
      <p>Weiterleitung zum Login...</p>
    </div>
  );
}

export default Logout;
