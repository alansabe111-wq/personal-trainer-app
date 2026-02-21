import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>App Personal Trainer</h1>
      <p>Bienvenido a tu sistema profesional de entrenamiento.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px" }}>
            Ir a Login
          </button>
        </Link>
      </div>
    </div>
  );
}