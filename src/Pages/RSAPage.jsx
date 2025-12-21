import React, { useState, useEffect } from 'react';
import JSEncrypt from 'jsencrypt';

const RSAPage = () => {
  const [encData, setEncData] = useState({ 
    text: '', 
    pubKey: localStorage.getItem('rsa_pub') || '', 
    result: '' 
  });
  const [decData, setDecData] = useState({ 
    text: '', 
    privKey: localStorage.getItem('rsa_priv') || '', 
    result: '' 
  });

  // Ruajtja automatike në LocalStorage
  useEffect(() => {
    localStorage.setItem('rsa_pub', encData.pubKey);
    localStorage.setItem('rsa_priv', decData.privKey);
  }, [encData.pubKey, decData.privKey]);

  const handleEncrypt = () => {
    const crypt = new JSEncrypt();
    crypt.setPublicKey(encData.pubKey);
    const res = crypt.encrypt(encData.text);
    setEncData({...encData, result: res || "Gabim! Public Key e pavlefshme."});
  };

  const handleDecrypt = () => {
    const crypt = new JSEncrypt();
    crypt.setPrivateKey(decData.privKey);
    const res = crypt.decrypt(decData.text);
    setDecData({...decData, result: res || "Gabim! Private Key e pavlefshme."});
  };

  const boxStyle = { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' };
  const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' };

  return (
    <div className="app-container" style={{ marginTop: '-30px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>RSA Asymmetric</h1>
        <p style={{ color: 'var(--text-muted)' }}>Çelësat ruhen lokalisht në browser.</p>
      </header>

      <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={boxStyle}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '15px' }}>Enkriptimi</h3>
          <textarea placeholder="Mesazhi..." style={inputStyle} rows="2" onChange={e => setEncData({...encData, text: e.target.value})} />
          <textarea placeholder="Public Key..." style={inputStyle} rows="4" value={encData.pubKey} onChange={e => setEncData({...encData, pubKey: e.target.value})} />
          <button onClick={handleEncrypt} style={{ width: '100%', background: '#8b5cf6', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Encrypt</button>
          <textarea style={{ ...inputStyle, marginTop: '10px', background: '#f8fafc', fontSize: '11px' }} readOnly value={encData.result} />
        </div>

        <div style={boxStyle}>
          <h3 style={{ color: '#6366f1', marginBottom: '15px' }}>Dekriptimi</h3>
          <textarea placeholder="Ciphertext..." style={inputStyle} rows="2" onChange={e => setDecData({...decData, text: e.target.value})} />
          <textarea placeholder="Private Key..." style={inputStyle} rows="4" value={decData.privKey} onChange={e => setDecData({...decData, privKey: e.target.value})} />
          <button onClick={handleDecrypt} style={{ width: '100%', background: '#6366f1', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Decrypt</button>
          <textarea style={{ ...inputStyle, marginTop: '10px', background: '#f8fafc' }} readOnly value={decData.result} />
        </div>
      </div>
    </div>
  );
};

export default RSAPage;