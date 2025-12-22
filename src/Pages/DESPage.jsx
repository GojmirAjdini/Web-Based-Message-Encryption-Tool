import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// --- IKONAT VEKTORIALE (SVG) ---
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const UnlockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 7l.343.343L15 6.686l-1.343-1.343L12 7zm0 0l2.343-2.343l1.343 1.343L13.343 8.343 12 7z"></path></svg>
);

const DESPage = () => {
  const [data, setData] = useState({ 
    text: '', 
    encKey: '',       // Çelësi për enkriptim
    encResult: '', 
    decText: '', 
    decKey: '',       // Çelësi për dekriptim (i ndarë)
    decResult: '' 
  });

  const encrypt = () => {
    if(!data.text || !data.encKey) return;
    const res = CryptoJS.DES.encrypt(data.text, data.encKey).toString();
    setData({...data, encResult: res});
  };

  const decrypt = () => {
    if(!data.decText || !data.decKey) return;
    try {
      const bytes = CryptoJS.DES.decrypt(data.decText, data.decKey);
      const res = bytes.toString(CryptoJS.enc.Utf8);
      setData({...data, decResult: res || "Invalid Key"});
    } catch { setData({...data, decResult: "Decryption Failed"}); }
  };

  // --- UI COMPONENTS STYLES ---
  const styles = {
    pageWrapper: { marginTop: '-20px', paddingBottom: '80px', color: 'var(--text-main, #000)' },
    headerSection: { textAlign: 'center', marginBottom: '60px' },
    title: { fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '10px', color: 'var(--text-main, #000)' },
    subtitle: { color: 'var(--text-muted, #4b5563)', fontSize: '1.1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '40px' },
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
        <h1 style={styles.title}>DES Legacy Standard</h1>
        <p style={styles.subtitle}>Algoritëm klasik 64-bit me kontroll të ndarë të çelësave.</p>
      </header>

      <div style={styles.grid}>
        {/* CARD: ENCRYPTION */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={{margin:0, fontWeight: 800}}>Encryption</h2>
            <div style={{color: '#f59e0b'}}><ShieldIcon /></div>
          </div>

          <label style={styles.label}>Plaintext Message</label>
          <textarea 
            style={{...styles.input, minHeight: '120px'}} 
            placeholder="Shkruani mesazhin..." 
            value={data.text} 
            onChange={e => setData({...data, text: e.target.value})} 
          />

          <label style={styles.label}><KeyIcon /> Encryption Key</label>
          <input 
            type="password" 
            style={styles.input} 
            placeholder="Vendos çelësin për kodim..." 
            value={data.encKey} 
            onChange={e => setData({...data, encKey: e.target.value})} 
          />

          <button style={styles.button('#f59e0b')} onClick={encrypt}>
            <ShieldIcon /> Secure Data (DES)
          </button>

          {data.encResult && (
            <div style={{marginTop: '25px'}}>
              <label style={{...styles.label, color: 'var(--text-main)'}}>Output Ciphertext</label>
              <textarea style={styles.outputArea} readOnly value={data.encResult} rows="4" />
            </div>
          )}
        </div>

        {/* CARD: DECRYPTION */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={{margin:0, fontWeight: 800}}>Decryption</h2>
            <div style={{color: '#4b5563'}}><UnlockIcon /></div>
          </div>

          <label style={styles.label}>Ciphertext Input</label>
          <textarea 
            style={{...styles.input, minHeight: '120px'}} 
            placeholder="Ngjisni tekstin e koduar..." 
            value={data.decText} 
            onChange={e => setData({...data, decText: e.target.value})} 
          />

          <label style={styles.label}><KeyIcon /> Decryption Key</label>
          <input 
            type="password" 
            style={styles.input} 
            placeholder="Vendos çelësin për hapje..."
            value={data.decKey} 
            onChange={e => setData({...data, decKey: e.target.value})} 
          />

          <button style={styles.button('var(--text-muted, #4b5563)')} onClick={decrypt}>
            <UnlockIcon /> Reverse Cipher
          </button>

          {data.decResult && (
            <div style={{marginTop: '25px'}}>
              <label style={{...styles.label, color: 'var(--text-main)'}}>Original Plaintext</label>
              <textarea style={styles.outputArea} readOnly value={data.decResult} rows="4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DESPage;