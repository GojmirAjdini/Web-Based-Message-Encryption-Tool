import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

function DecryptForm() {
  const [encryptedText, setEncryptedText] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [decrypted, setDecrypted] = useState("");

  
  useEffect(() => {
    const storedEncrypted = sessionStorage.getItem("encrypted");
    const storedKey = sessionStorage.getItem("secretKey");

    if (storedEncrypted) setEncryptedText(storedEncrypted);
    if (storedKey) setSecretKey(storedKey);
  }, []);

  const setNull = () => {
    setDecrypted("");
    setEncryptedText("");
    setSecretKey("");

  
    sessionStorage.removeItem("encrypted");
    sessionStorage.removeItem("secretKey");
  };

  const handleDecrypt = () => {
    if (!encryptedText || !secretKey) return;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const text = bytes.toString(CryptoJS.enc.Utf8);

      const result = text || "Invalid secret key or encrypted text";
      setDecrypted(result);

     
      sessionStorage.setItem("encrypted", encryptedText);
      sessionStorage.setItem("secretKey", secretKey);
    } catch {
      setDecrypted("Decryption error");
    }
  };

  return (
    <div className="box">
      <h2>Text Decryption</h2>

      <label>Enter Encrypted Text to Decrypt</label>
      <textarea
        placeholder="Enter encrypted text"
        value={encryptedText}
        onChange={(e) => setEncryptedText(e.target.value)}
      />

      <label>Secret Key</label>
      <input
        type="text"
        placeholder="Enter Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
      />

      <button onClick={handleDecrypt}>Decrypt</button>
      <button className="clearBtn" onClick={setNull}>Clear</button>

      <label>Decrypted Text</label>
      <textarea readOnly value={decrypted} />
    </div>
  );
}

export default DecryptForm;
