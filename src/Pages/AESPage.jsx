import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// --- IKONAT VEKTORIALE (SVG) ---
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const UnlockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 7l.343.343L15 6.686l-1.343-1.343L12 7zm0 0l2.343-2.343l1.343 1.343L13.343 8.343 12 7z"></path></svg>
);

const AESPage = () => {
  // NDARJA E STATE: Tani kemi encKey dhe decKey te ndara
  const [encData, setEncData] = useState({ text: '', key: '', result: '' });
  const [decData, setDecData] = useState({ text: '', key: '', result: '' });

  const encrypt = () => {
    if(!encData.text || !encData.key) return;
    const res = CryptoJS.AES.encrypt(encData.text, encData.key).toString();
    setEncData({...encData, result: res});
  };

  const decrypt = () => {
    if(!decData.text || !decData.key) return;
    try {
      const bytes = CryptoJS.AES.decrypt(decData.text, decData.key);
      const res = bytes.toString(CryptoJS.enc.Utf8);
      setDecData({...decData, result: res || "Invalid Key"});
    } catch { 
      setDecData({...decData, result: "Decryption Failed"}); 
    }
  };

  // --- UI COMPONENTS STYLES ---
  const styles = {
    pageWrapper: { marginTop: '-20px', paddingBottom: '80px', color: 'var(--text-main, #000)' },
    headerSection: { textAlign: 'center', marginBottom: '60px' },
    title: { fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '10px', color: 'var(--text-main, #000)' },
    subtitle: { color: 'var(--text-muted, #4b5563)', fontSize: '1.1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' },
    card: { background: 'var(--card-bg, #fff)', borderRadius: '24px', padding: '40px', border: '1px solid var(--border-color, #e5e7eb)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid var(--border-color, #f3f4f6)', paddingBottom: '20px', color: 'var(--text-main, #000)' },
    label: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', color: 'var(--text-muted, #4b5563)' },
    input: { width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid var(--input-border, #000)', background: 'var(--input-bg, #fff)', color: 'var(--text-main, #000)', fontSize: '1rem', fontWeight: '500', marginBottom: '25px', outline: 'none' },
    button: (color) => ({ width: '100%', padding: '16px', background: color, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }),
    outputArea: { width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--input-bg, #f9fafb)', border: '2px dashed var(--border-color, #d1d5db)', marginTop: '20px', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-main, #000)' }
  };

  return (
    <div className="app-container" style={styles.pageWrapper}>
      <header style={styles.headerSection}>
        <h1 style={styles.title}>AES-256 Encryption</h1>
        <p style={styles.subtitle}>Mbrojtje asimetrike e proceseve tuaja.</p>
      </header>

      <div style={styles.grid}>
        {/* CARD: ENCRYPTION */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={{margin:0, fontWeight: 800}}>Encryption</h2>
            <div style={{color: '#10b981'}}><LockIcon /></div>
          </div>

          <label style={styles.label}>Plaintext Message</label>
          <textarea style={{...styles.input, minHeight: '120px'}} placeholder="Shkruaj mesazhin..." value={encData.text} onChange={e => setEncData({...encData, text: e.target.value})} />

          <label style={styles.label}><KeyIcon /> Encryption Key</label>
          <input type="password" style={styles.input} placeholder="Vendos çelësin..." value={encData.key} onChange={e => setEncData({...encData, key: e.target.value})} />

          <button 
  style={styles.button('var(--primary, #4f46e5)')} 
  onClick={encrypt}
  className="btn-hover-effect"
>
  <LockIcon /> Process Encryption
</button>

          {encData.result && (
            <div style={{marginTop: '25px'}}>
              {/* NDRYSHIMI: Ngjyra e labelit tani ndjek temen (var(--text-main)) */}
              <label style={{...styles.label, color: 'var(--text-main)'}}>Output Ciphertext</label>
              <textarea style={styles.outputArea} readOnly value={encData.result} rows="4" />
            </div>
          )}
        </div>

        {/* CARD: DECRYPTION */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={{margin:0, fontWeight: 800}}>Decryption</h2>
            <div style={{color: '#6366f1'}}><UnlockIcon /></div>
          </div>

          <label style={styles.label}>Ciphertext Input</label>
          <textarea style={{...styles.input, minHeight: '120px'}} placeholder="Ngjit tekstin e koduar..." value={decData.text} onChange={e => setDecData({...decData, text: e.target.value})} />

          <label style={styles.label}><KeyIcon /> Decryption Key</label>
          <input type="password" style={styles.input} placeholder="Vendos çelësin për hapje..." value={decData.key} onChange={e => setDecData({...decData, key: e.target.value})} />

          <button style={styles.button('#6366f1')} onClick={decrypt}>
            <UnlockIcon /> Run Decryption
          </button>

          {decData.result && (
            <div style={{marginTop: '25px'}}>
              <label style={{...styles.label, color: 'var(--text-main)'}}>Restored Plaintext</label>
              <textarea style={styles.outputArea} readOnly value={decData.result} rows="4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AESPage;