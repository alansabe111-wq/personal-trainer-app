import { Link } from "react-router-dom";

export default function Layout({ children, currentUser, logout }) {
  return (
    <div style={container}>
      <aside style={sidebar}>
        <h2 style={{ color: "#00bfff" }}>PT System</h2>

        <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link style={link} to="/dashboard">Dashboard</Link>

          {currentUser?.role === "admin" && (
            <Link style={link} to="/crear-usuario">Usuarios</Link>
          )}
        </nav>

        <button style={logoutBtn} onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      <main style={main}>
        {children}
      </main>
    </div>
  );
}

const container = {
  display: "flex",
  height: "100vh",
  backgroundColor: "#111",
  color: "white",
};

const sidebar = {
  width: "220px",
  backgroundColor: "#1a1a1a",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const main = {
  flex: 1,
  padding: "40px",
};

const link = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};

const logoutBtn = {
  backgroundColor: "#00bfff",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};