import EncryptForm from "./components/EncryptForm";
import DecryptForm from "./components/DecryptForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 style={{textAlign:'center', marginTop:50, marginBottom:'50px'}}>Web-Based Encryption Tool</h1>
      <div className="grid">
        <EncryptForm />
        <DecryptForm />
      </div>
    </div>
  );
}

export default App;
