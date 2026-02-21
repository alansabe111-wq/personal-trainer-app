import { useState, useEffect } from "react";

function Exercises() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [video, setVideo] = useState("");
  const [exercises, setExercises] = useState([]);

  // Cargar
  useEffect(() => {
    const saved = localStorage.getItem("exercises");
    if (saved) setExercises(JSON.parse(saved));
  }, []);

  // Guardar
  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = () => {
    if (!name) return;

    const newExercise = {
      id: Date.now(),
      name,
      body,
      video,
    };

    setExercises([...exercises, newExercise]);
    setName("");
    setBody("");
    setVideo("");
  };

  return (
  <div className="container">
      <h2>Ejercicios</h2>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Zona del cuerpo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <input
        placeholder="Link video YouTube"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />

      <button onClick={addExercise}>Agregar</button>

      <ul>
        {exercises.map((e) => (
          <li key={e.id}>
            <p>{e.name} — {e.body}</p>

            {e.video && (
              <iframe
                width="300"
                height="200"
                src={e.video.replace("watch?v=", "embed/")}
                title={e.name}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Exercises;