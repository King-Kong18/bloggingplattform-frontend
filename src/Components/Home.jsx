import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { FiFeather, FiMessageCircle, FiUsers, FiShield } from 'react-icons/fi';
import '../Styles/home-style.css';
import DefaultHeader from './DefaultHeader';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <DefaultHeader />
      <section className="intro">
        <h2>Willkommen bei TypeLoop!</h2>
        <p>
          Verbinde dich mit kreativen Köpfen aus Winterthur und darüber hinaus. Schreibe deine Geschichten, teile deine Ideen und entdecke neue Perspektiven in einer lebendigen Community.
        </p>
      </section>

      <section className="features">
        <h2>Darum TypeLoop</h2>
        <ul>
          <li>
            <FiFeather size={20} color="#2575fc" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Modernes Design & einfache Bedienung
          </li>
          <li>
            <FiMessageCircle size={20} color="#2575fc" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Interaktive Kommentare & echtes Feedback
          </li>
          <li>
            <FiUsers size={20} color="#2575fc" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Chat-Funktion für direkten Austausch
          </li>
          <li>
            <FiShield size={20} color="#2575fc" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Deine Daten sind bei uns sicher!
          </li>
        </ul>
      </section>

      <button className="button" onClick={() => navigate("/login")} aria-label="Anmelden oder Registrieren">
        Anmelden / Registrieren
      </button>
    </>
  );
}

export default Home;
