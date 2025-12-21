import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const DESPage = () => {
  const [data, setData] = useState({ 
    text: '', 
    key: localStorage.getItem('des_key') || '', 
    encResult: '', 
    decText: '', 
    decResult: '' 
  });

  useEffect(() => {
    localStorage.setItem('des_key', data.key);
  }, [data.key]);

  const encrypt = () => {
    const res = CryptoJS.DES.encrypt(data.text, data.key).toString();
    setData({...data, encResult: res});
  };

  const decrypt = () => {
    try {
      const bytes = CryptoJS.DES.decrypt(data.decText, data.key);
      const res = bytes.toString(CryptoJS.enc.Utf8);
      setData({...data, decResult: res || "Invalid Key"});
    } catch { setData({...data, decResult: "Error!"}); }
  };

  const boxStyle = { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' };
  const inputStyle = { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' };

  return (
    <div className="app-container" style={{ marginTop: '-30px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>DES Legacy</h1>
        <p style={{ color: 'var(--text-muted)' }}>Algoritëm 64-bit me ruajtje çelësi.</p>
      </header>

      <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={boxStyle}>
          <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>Enkriptimi</h3>
          <input style={inputStyle} type="text" placeholder="Çelësi (Ruhet)" value={data.key} onChange={e => setData({...data, key: e.target.value})} />
          <textarea placeholder="Mesazhi..." style={inputStyle} rows="3" onChange={e => setData({...data, text: e.target.value})} />
          <button onClick={encrypt} style={{ width: '100%', background: '#f59e0b', color: 'white', border: 'none', padding: '10px', borderRadius: '6px' }}>Encrypt</button>
          <textarea style={{ ...inputStyle, marginTop: '10px', background: '#f8fafc' }} readOnly value={data.encResult} />
        </div>

        <div style={boxStyle}>
          <h3 style={{ color: '#4b5563', marginBottom: '15px' }}>Dekriptimi</h3>
          <textarea placeholder="Ciphertext..." style={inputStyle} rows="3" onChange={e => setData({...data, decText: e.target.value})} />
          <button onClick={decrypt} style={{ width: '100%', background: '#4b5563', color: 'white', border: 'none', padding: '10px', borderRadius: '6px' }}>Decrypt</button>
          <textarea style={{ ...inputStyle, marginTop: '10px', background: '#f8fafc' }} readOnly value={data.decResult} />
        </div>
      </div>
    </div>
  );
};

export default DESPage;