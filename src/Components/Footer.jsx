import React from "react";
import "../Styles/footer-style.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdOutlinePolicy, MdPrivacyTip } from "react-icons/md";
import { FiClock } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section company">
                    <h3>TypeLoop AG</h3>
                    <p>Technologie neu gedacht.</p>
                    <p>Seit 2025</p>
                </div>

                <div className="footer-section contact">
                    <h4>Kontakt</h4>
                    <p><FaMapMarkerAlt /> Zürcherstrasse 101<br />8406 Winterthur, Schweiz</p>
                    <p><FaPhoneAlt /> +41 52 123 45 67</p>
                    <p><FaEnvelope /> info@typeloop.ch</p>
                    <p><FiClock /> Mo–Fr: 09:00–17:00</p>
                </div>

                <div className="footer-section legal">
                    <h4>Rechtliches</h4>
                    <p><MdOutlinePolicy /> Impressum</p>
                    <p><MdPrivacyTip /> Datenschutz</p>
                    <p>AGB</p>
                </div>

                <div className="footer-section social">
                    <h4>Folge uns</h4>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 TypeLoop AG – Alle Rechte vorbehalten.</p>
            </div>
        </footer>
    );
}
