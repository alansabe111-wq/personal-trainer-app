import { useState, useEffect } from "react";

function Routines() {
  const [name, setName] = useState("");
  const [routines, setRoutines] = useState([]);
  const [clients, setClients] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    setRoutines(JSON.parse(localStorage.getItem("routines")) || []);
    setClients(JSON.parse(localStorage.getItem("clients")) || []);
    setExercises(JSON.parse(localStorage.getItem("exercises")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  const toggleExercise = (id) => {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(selectedExercises.filter((x) => x !== id));
    } else {
      setSelectedExercises([...selectedExercises, id]);
    }
  };

  const addRoutine = () => {
    if (!name || !selectedClient) return;

    const newRoutine = {
      id: Date.now(),
      name,
      clientId: selectedClient,
      exercises: selectedExercises,
    };

    setRoutines([...routines, newRoutine]);

    setName("");
    setSelectedExercises([]);
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  return (
  <div className="container">
      <h2>Rutinas</h2>

      <input
        placeholder="Nombre rutina"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Elegir cliente</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <h3>Elegir ejercicios</h3>

      {exercises.map((e) => (
        <label key={e.id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedExercises.includes(e.id)}
            onChange={() => toggleExercise(e.id)}
          />
          {e.name}
        </label>
      ))}

      <button onClick={addRoutine}>Crear</button>

      <ul>
        {routines.map((r) => {
          const client = clients.find((c) => c.id == r.clientId);

          return (
            <li key={r.id}>
              <strong>{r.name}</strong> — {client?.name}

              <ul>
                {r.exercises.map((exId) => {
                  const ex = exercises.find((x) => x.id === exId);
                  return <li key={exId}>{ex?.name}</li>;
                })}
              </ul>

              <button onClick={() => deleteRoutine(r.id)}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Routines;