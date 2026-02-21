import { useState, useEffect } from "react";

export default function CrearUsuario({ currentUser }) {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [mensaje, setMensaje] = useState("");
  const [users, setUsers] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    actualizarLista();
  }, []);

  const actualizarLista = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dni || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (editando) {
      const usuarioOriginal = storedUsers.find((u) => u.dni === editando);
      const admins = storedUsers.filter((u) => u.role === "admin");

      // 🚫 No quitar rol al único admin
      if (
        usuarioOriginal.role === "admin" &&
        role !== "admin" &&
        admins.length === 1
      ) {
        setMensaje("No podés quitar el rol al único administrador.");
        return;
      }

      const nuevosUsers = storedUsers.map((u) =>
        u.dni === editando ? { ...u, dni, password, role } : u
      );

      localStorage.setItem("users", JSON.stringify(nuevosUsers));

      // 🔄 Si editás tu propio usuario, actualizar sesión
      if (currentUser.dni === editando) {
        const nuevoAuth = { dni, password, role };
        localStorage.setItem("authUser", JSON.stringify(nuevoAuth));
      }

      setMensaje("Usuario actualizado ✅");
      setEditando(null);
    } else {
      const existe = storedUsers.find((u) => u.dni === dni);

      if (existe) {
        setMensaje("Ese DNI ya existe");
        return;
      }

      const nuevoUsuario = { dni, password, role };

      localStorage.setItem(
        "users",
        JSON.stringify([...storedUsers, nuevoUsuario])
      );

      setMensaje("Usuario creado correctamente ✅");
    }

    setDni("");
    setPassword("");
    setRole("client");
    actualizarLista();
  };

  const handleDelete = (dniEliminar) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioAEliminar = storedUsers.find((u) => u.dni === dniEliminar);
    const admins = storedUsers.filter((u) => u.role === "admin");

    // 🚫 No eliminarte a vos mismo
    if (currentUser.dni === dniEliminar) {
      setMensaje("No podés eliminar tu propio usuario.");
      return;
    }

    // 🚫 No eliminar al único admin
    if (usuarioAEliminar.role === "admin" && admins.length === 1) {
      setMensaje("No podés eliminar al único administrador.");
      return;
    }

    const nuevosUsers = storedUsers.filter((u) => u.dni !== dniEliminar);

    localStorage.setItem("users", JSON.stringify(nuevosUsers));
    actualizarLista();
  };

  const handleEdit = (user) => {
    setDni(user.dni);
    setPassword(user.password);
    setRole(user.role);
    setEditando(user.dni);
    setMostrarPassword(true); // Mostrar contraseña automáticamente al editar
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Panel Admin - Usuarios</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={inputStyle}
        />

        {/* Input contraseña con botón mostrar */}
        <div style={{ position: "relative" }}>
          <input
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, width: "100%" }}
          />

          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {mostrarPassword ? "🙈" : "👁"}
          </button>
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="client">Cliente</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={buttonStyle}>
          {editando ? "Actualizar Usuario" : "Crear Usuario"}
        </button>

        {mensaje && <p>{mensaje}</p>}
      </form>

      <h3 style={{ marginTop: "40px" }}>Usuarios existentes</h3>

      {users.map((u, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "500px",
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #444",
            borderRadius: "6px",
          }}
        >
          <div>
            <strong>{u.dni}</strong> - {u.role}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleEdit(u)}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Editar
            </button>

            <button
              onClick={() => handleDelete(u.dni)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

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