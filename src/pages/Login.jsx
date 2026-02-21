import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ login }) {
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(dni, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("DNI o contraseña incorrectos");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2>Ingreso por DNI</h2>

        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={buttonStyle}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
};

const formStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#1e3c72",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};