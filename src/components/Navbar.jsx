import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <LogoSVG />
          <div style={{display: 'flex', flexDirection: 'column', lineHeight: '1'}}>
            <span style={{fontSize: '1.2rem', fontWeight: '800'}}>SECURE</span>
            <span style={{fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '2px'}}>CRYPT</span>
          </div>
        </Link>

        <div style={{display: 'flex', gap: '25px', alignItems: 'center'}}>
          <Link to="/aes" style={linkStyle}>AES</Link>
          <Link to="/rsa" style={linkStyle}>RSA</Link>
          <Link to="/des" style={linkStyle}>DES</Link>
          <button onClick={toggleTheme} style={themeBtnStyle}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
};

const LogoSVG = () => (
  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const navStyle = { position: 'sticky', top: 0, background: 'var(--nav-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)', zIndex: 100, padding: '12px 0' };
const containerStyle = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' };
const logoStyle = { textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' };
const linkStyle = { textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem' };
const themeBtnStyle = { background: 'var(--border)', color: 'var(--text-main)', padding: '6px 12px', fontSize: '0.8rem' };

export default Navbar;