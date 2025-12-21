import React from 'react';
import { Link } from 'react-router-dom';

// Ikona Profesionale me madhësi pak më të vogël për të kursyer hapësirë
const ShieldIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '10px' }}>
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Home = () => {
  return (
    <div className="app-container" style={{ marginTop: '-20px' }}> {/* Ngjitja lart */}
      <header style={{textAlign: 'center', padding: '20px 0 40px 0'}}> {/* Zvogëlimi i padding lart */}
        <ShieldIcon />
        <br />
        <span style={badge}>Advanced Security Toolkit</span>
        <h1 style={{fontSize: '3rem', margin: '15px 0', lineHeight: '1.2'}}>
          Mbroni Të Dhënat me <br/> 
          <span style={{color: 'var(--primary)'}}>Kriptografi Moderne</span>
        </h1>
        <p style={{color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto', fontSize: '0.95rem'}}>
          Zgjidhni një nga algoritmet më të fuqishme për të siguruar mesazhet tuaja në kohë reale.
        </p>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px'}}>
        <Card title="AES-256" type="Symmetrical" color="#10b981" path="/aes" desc="Standardi botëror i sigurisë, i përdorur nga qeveritë dhe bankat." />
        <Card title="RSA" type="Asymmetrical" color="#8b5cf6" path="/rsa" desc="Siguri me çelësa publik/privat për shkëmbime asimetrike." />
        <Card title="DES" type="Legacy" color="#f59e0b" path="/des" desc="Algoritëm klasik 64-bit, ideal për testim dhe edukim kriptografik." />
      </div>
    </div>
  );
};

const Card = ({title, type, color, path, desc}) => (
  <div className="box" style={{borderTop: `4px solid ${color}`, padding: '20px'}}>
    <span style={{color: color, fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase'}}>{type}</span>
    <h2 style={{margin: '10px 0', fontSize: '1.4rem'}}>{title}</h2>
    <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px'}}>{desc}</p>
    <Link to={path}><button style={{width: '100%', background: color, border: 'none', color: 'white', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'}}>Nis Punën →</button></Link>
  </div>
);

const badge = { 
  background: 'rgba(99, 102, 241, 0.1)', 
  color: 'var(--primary)', 
  padding: '4px 12px', 
  borderRadius: '20px', 
  fontSize: '0.75rem', 
  fontWeight: '600',
  display: 'inline-block'
};

export default Home;