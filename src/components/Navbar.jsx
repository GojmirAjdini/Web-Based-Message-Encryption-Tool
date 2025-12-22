import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* LOGO ME DIZAJN MINIMAL */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <LogoSVG />
          </div>
          <div style={styles.logoText}>
            <span style={styles.brandName}>CRYPTA</span>
            <span style={styles.brandSub}>LABS</span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div style={styles.navLinks}>
          <NavLink to="/aes" label="AES-256" active={location.pathname === "/aes"} />
          <NavLink to="/rsa" label="RSA" active={location.pathname === "/rsa"} />
          <NavLink to="/des" label="DES" active={location.pathname === "/des"} />
          
          <div style={styles.divider}></div>

          {/* THEME TOGGLE ICON */}
          <button onClick={toggleTheme} style={styles.themeBtn}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Komponent i vogël për linket për të pasur kod më të pastër
const NavLink = ({ to, label, active }) => (
  <Link to={to} style={{
    ...styles.link,
    color: active ? 'var(--primary)' : 'var(--text-muted)',
    borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent'
  }}>
    {label}
  </Link>
);

// --- IKONAT (SVGs) ---
const LogoSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

// --- STYLES (PREMIUM LOOK) ---
const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    background: 'var(--nav-bg, rgba(255, 255, 255, 0.8))',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-color, rgba(0,0,0,0.1))',
    zIndex: 1000,
    padding: '10px 0',
    transition: 'all 0.3s ease'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px'
  },
  logo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    background: 'var(--primary, #4f46e5)',
    color: '#fff',
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.1'
  },
  brandName: {
    fontSize: '1.3rem',
    fontWeight: '900',
    color: 'var(--text-main)',
    letterSpacing: '-0.5px'
  },
  brandSub: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--primary)',
    letterSpacing: '3px'
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    padding: '5px 0',
    transition: 'all 0.2s ease'
  },
  divider: {
    width: '1px',
    height: '20px',
    background: 'var(--border-color)',
    opacity: 0.5
  },
  themeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-main)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    outline: 'none'
  }
};

export default Navbar;