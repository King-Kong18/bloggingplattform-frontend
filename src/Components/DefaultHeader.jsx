import '../Styles/defaultHeader-style.css';
import { Link } from 'react-router-dom';

function DefaultHeader() {
    return (
        <header className="header-container">
            <div className="header-left">
                <Link to="/" className="logo" aria-label="TypeLoop Startseite">
                    <img src="src/assets/Logo.png" alt="TypeLoop Logo" />
                </Link>
                <h1>TypeLoop</h1>
            </div>
            <p className="tagline">Die Bloggingplattform aus Winterthur - seit 2025</p>
        </header>
    );
}

export default DefaultHeader;
