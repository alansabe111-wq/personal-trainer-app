import { Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, logout }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#111",
        color: "white",
      }}
    >
      <h2>Personal Trainer</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Inicio
        </Link>

        {!isAuthenticated && (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}

        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              style={{
                background: "red",
                border: "none",
                color: "white",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}