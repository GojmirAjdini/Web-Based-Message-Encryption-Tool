import React, { useState } from 'react';
import JSEncrypt from 'jsencrypt';

const RSAPage = () => {
  const [keys, setKeys] = useState({ public: '', private: '' });
  const [encData, setEncData] = useState({ text: '', key: '', result: '' });
  const [decData, setDecData] = useState({ text: '', key: '', result: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  // Gjenerimi i çelësave (nuk i shpërndan automatikisht te fushat)
  const generateNewKeys = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const crypt = new JSEncrypt({ default_key_size: 1024 });
      setKeys({ public: crypt.getPublicKey(), private: crypt.getPrivateKey() });
      setIsGenerating(false);
    }, 500);
  };

  const encrypt = () => {
    if (!encData.text || !encData.key) return alert("Vendosni mesazhin dhe Çelësin Publik!");
    const crypt = new JSEncrypt();
    crypt.setPublicKey(encData.key);
    const res = crypt.encrypt(encData.text);
    setEncData({ ...encData, result: res || "Gabim: Çelësi publik i pavlefshëm!" });
  };

  const decrypt = () => {
    if (!decData.text || !decData.key) return alert("Vendosni Ciphertext-in dhe Çelësin tuaj Privat!");
    const crypt = new JSEncrypt();
    crypt.setPrivateKey(decData.key);
    const res = crypt.decrypt(decData.text);
    setDecData({ ...decData, result: res || "Gabim: Dekriptimi dështoi!" });
  };

  const styles = {
    pageWrapper: { marginTop: '-20px', paddingBottom: '80px', color: 'var(--text-main, #000)' },
    card: { background: 'var(--card-bg, #fff)', borderRadius: '24px', padding: '35px', border: '1px solid var(--border-color, #e5e7eb)', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' },
    label: { display: 'block', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)' },
    input: { width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid var(--input-border, #000)', background: 'var(--input-bg, #fff)', color: 'var(--text-main)', marginBottom: '15px', outline: 'none', fontFamily: 'inherit' },
    output: { width: '100%', padding: '14px', borderRadius: '12px', background: 'var(--input-bg, #f9fafb)', border: '2px dashed var(--border-color)', color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '0.85rem' },
    btn: (bg) => ({ width: '100%', padding: '14px', background: bg, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', transition: 'opacity 0.2s' })
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>RSA Asymmetric Tool</h1>
        <p style={{ color: 'var(--text-muted)' }}>Proces i pavarur i enkriptimit dhe dekriptimit.</p>
      </header>

      {/* 1. KEY GENERATOR PANEL */}
      <div style={{ ...styles.card, marginBottom: '40px', textAlign: 'center' }}>
        <h3 style={{ marginTop: 0 }}>Gjenerator i Çelësave</h3>
        <button 
          style={styles.btn('#4f46e5')} 
          onClick={generateNewKeys}
          disabled={isGenerating}
        >
          {isGenerating ? "Duke punuar..." : "Gjenero Çiftin RSA"}
        </button>
        
        {keys.public && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px', textAlign: 'left' }}>
            <div>
              <label style={styles.label}>Kopjo Çelësin Publik:</label>
              <textarea style={{ ...styles.input, height: '80px', fontSize: '0.7rem' }} readOnly value={keys.public} />
            </div>
            <div>
              <label style={styles.label}>Kopjo Çelësin Privat:</label>
              <textarea style={{ ...styles.input, height: '80px', fontSize: '0.7rem' }} readOnly value={keys.private} />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* 2. ENCRYPTION CARD */}
        <div style={styles.card}>
          <h2 style={{ color: '#10b981', marginTop: 0 }}>Enkriptimi</h2>
          <label style={styles.label}>Mesazhi</label>
          <textarea 
            style={{ ...styles.input, height: '100px' }} 
            placeholder="Shkruaj tekstin këtu..."
            value={encData.text}
            onChange={(e) => setEncData({ ...encData, text: e.target.value })}
          />
          <label style={styles.label}>Çelësi Publik i Marrësit</label>
          <textarea 
            style={{ ...styles.input, height: '100px', fontSize: '0.7rem' }} 
            placeholder="Ngjit çelësin publik këtu..."
            value={encData.key}
            onChange={(e) => setEncData({ ...encData, key: e.target.value })}
          />
          <button style={styles.btn('#10b981')} onClick={encrypt}>Enkripto me Public Key</button>
          {encData.result && (
            <div style={{ marginTop: '20px' }}>
              <label style={styles.label}>Ciphertext i Gjeneruar:</label>
              <textarea style={styles.output} readOnly value={encData.result} rows="5" />
            </div>
          )}
        </div>

        {/* 3. DECRYPTION CARD */}
        <div style={styles.card}>
          <h2 style={{ color: '#f59e0b', marginTop: 0 }}>Dekriptimi</h2>
          <label style={styles.label}>Ciphertext për t'u hapur</label>
          <textarea 
            style={{ ...styles.input, height: '100px' }} 
            placeholder="Ngjit tekstin e koduar këtu..."
            value={decData.text}
            onChange={(e) => setDecData({ ...decData, text: e.target.value })}
          />
          <label style={styles.label}>Çelësi juaj Privat</label>
          <textarea 
            style={{ ...styles.input, height: '100px', fontSize: '0.7rem' }} 
            placeholder="Ngjit çelësin privat këtu..."
            value={decData.key}
            onChange={(e) => setDecData({ ...decData, key: e.target.value })}
          />
          <button style={styles.btn('#f59e0b')} onClick={decrypt}>Dekripto me Private Key</button>
          {decData.result && (
            <div style={{ marginTop: '20px' }}>
              <label style={styles.label}>Mesazhi i Rizbuluar:</label>
              <div style={{ ...styles.output, background: 'rgba(245, 158, 11, 0.05)', border: '2px solid #f59e0b', fontWeight: 'bold' }}>
                {decData.result}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RSAPage;