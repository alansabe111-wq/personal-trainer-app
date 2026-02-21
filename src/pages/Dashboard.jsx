export default function Dashboard({ currentUser }) {
  return (
  <div className="container">
      <h1 style={{ marginBottom: "20px" }}>
        Bienvenido {currentUser?.dni}
      </h1>

      <div style={cardsContainer}>
        <div style={card}>
          <h3>Rutina actual</h3>
          <p>Próximamente...</p>
        </div>

        <div style={card}>
          <h3>Progreso</h3>
          <p>Próximamente...</p>
        </div>

        <div style={card}>
          <h3>Perfil</h3>
          <p>Podés editar tus datos</p>
        </div>
      </div>
    </div>
  );
}

const cardsContainer = {
  display: "flex",
  gap: "20px",
};

const card = {
  backgroundColor: "#1f1f1f",
  padding: "20px",
  borderRadius: "12px",
  flex: 1,
  boxShadow: "0px 5px 15px rgba(0,0,0,0.5)",
};