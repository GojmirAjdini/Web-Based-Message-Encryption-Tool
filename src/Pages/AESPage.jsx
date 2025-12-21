import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const AESPage = () => {
  // Ngarkimi i çelësit nga localStorage në fillim
  const [encData, setEncData] = useState({ 
    text: '', 
    key: localStorage.getItem('aes_key') || '', 
    result: '' 
  });

  // Ruajtja e çelësit sa herë që ndryshon
  useEffect(() => {
    localStorage.setItem('aes_key', encData.key);
  }, [encData.key]);

  const encrypt = () => {
    if(!encData.text || !encData.key) return alert("Plotëso tekstin dhe çelësin!");
    const res = CryptoJS.AES.encrypt(encData.text, encData.key).toString();
    setEncData({...encData, result: res});
  };

  // Stilizimi që ngjit përmbajtjen lart
  const boxStyle = { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' };

  return (
    <div className="app-container" style={{ marginTop: '-30px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>AES-256 Standard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enkriptim direkt në browser me ruajtje lokale të çelësit.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        <div style={boxStyle}>
          <h3 style={{ color: '#10b981', marginBottom: '15px' }}>Enkriptimi</h3>
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Mesazhi</label>
          <textarea style={inputStyle} rows="3" value={encData.text} onChange={e => setEncData({...encData, text: e.target.value})} />
          
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Secret Key (Ruhet automatikisht)</label>
          <input style={inputStyle} type="text" value={encData.key} onChange={e => setEncData({...encData, key: e.target.value})} />
          
          <button onClick={encrypt} style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Encrypt Now
          </button>
          
          <textarea style={{ ...inputStyle, marginTop: '15px', background: '#f8fafc', fontSize: '0.8rem' }} readOnly value={encData.result} placeholder="Rezultati do shfaqet këtu..." />
        </div>
        
        {/* Seksioni i dekriptimit vijon i ngjashëm... */}
      </div>
    </div>
  );
};

export default AESPage;