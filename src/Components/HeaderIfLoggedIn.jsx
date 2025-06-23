import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaComments, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../Styles/headerIfLoggedIn-style.css';

function HeaderIfLoggedIn() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/" className="logo">
                    <img src="src/assets/Logo.png" alt="TypeLoop Logo" />
                </Link>
            </div>
            <nav className="navbar">
                <NavLink to="/start" className={({ isActive }) => isActive ? 'nav-link nav-link-icon active' : 'nav-link nav-link-icon'}>
                    <FaHome />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/new-blog" className={({ isActive }) => isActive ? 'nav-link nav-link-icon active' : 'nav-link nav-link-icon'}>
                    <FaPlusCircle />
                    <span>Neuer Blog</span>
                </NavLink>
                <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-link nav-link-icon active' : 'nav-link nav-link-icon'}>
                    <FaComments />
                    <span>Chat</span>
                </NavLink>
                <NavLink to="/my-profile" className={({ isActive }) => isActive ? 'nav-link nav-link-icon active' : 'nav-link nav-link-icon'}>
                    <FaUser />
                    <span>Profil</span>
                </NavLink>
                <NavLink to="/logout" className={({ isActive }) => isActive ? 'nav-link nav-link-icon active' : 'nav-link nav-link-icon'}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default HeaderIfLoggedIn;
