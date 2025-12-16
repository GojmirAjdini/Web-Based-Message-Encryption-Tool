import { useState } from "react";
import CryptoJS from "crypto-js";

function EncryptForm() {
  const [message, setMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [encrypted, setEncrypted] = useState("");

  const setNull = () =>{
    setMessage("");
    setSecretKey("");
    setEncrypted("");
  }

  const handleEncrypt = () => {
    if (!message || !secretKey) return;
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
    setEncrypted(ciphertext);
  };

  return (
    <div className="box">
      <h2>Text Encryption</h2>
      <label>Enter any text to be Encrypted</label>
      <textarea
        placeholder="Enter text to encrypt"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <label>
        Secret Key
      </label>
      <input
        type="text"
        placeholder="Enter Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
      />

      <button onClick={handleEncrypt}>Encrypt</button>
      <button style={{marginLeft:20, backgroundColor:'#1f1f1f23', color:'black'}} onClick={setNull}>Clear</button>
      <label>Encrypted Output</label>
      <textarea readOnly value={encrypted} />
    </div>
  );
}

export default EncryptForm;
