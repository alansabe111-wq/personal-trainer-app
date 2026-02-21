import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Clients() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [clients, setClients] = useState([]);
  const [progress, setProgress] = useState({});
  const [inputs, setInputs] = useState({});

  // Cargar
  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("clients")) || [];
    const p = JSON.parse(localStorage.getItem("progress")) || {};

    setClients(c);
    setProgress(p);
  }, []);

  // Guardar
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const addClient = () => {
    if (!name) return;

    const newClient = {
      id: Date.now(),
      name,
      weight,
    };

    setClients([...clients, newClient]);
    setName("");
    setWeight("");
  };

  const addProgress = (clientId) => {
    const value = inputs[clientId];
    if (!value) return;

    const entry = {
      date: new Date().toLocaleDateString(),
      weight: Number(value),
    };

    const updated = {
      ...progress,
      [clientId]: [...(progress[clientId] || []), entry],
    };

    setProgress(updated);

    setInputs({
      ...inputs,
      [clientId]: "",
    });
  };

  return (
  <div className="container">
      <h2>Clientes</h2>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Peso inicial"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <button onClick={addClient}>Agregar</button>

      {clients.map((c) => {
        const data = progress[c.id] || [];

        return (
          <div key={c.id}>
            <h3>{c.name}</h3>

            <input
              placeholder="Nuevo peso"
              value={inputs[c.id] || ""}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [c.id]: e.target.value,
                })
              }
            />

            <button onClick={() => addProgress(c.id)}>Guardar</button>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}

export default Clients;