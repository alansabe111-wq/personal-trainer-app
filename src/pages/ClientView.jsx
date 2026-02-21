import { useEffect, useState } from "react";

function ClientView() {
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem("routines")) || [];
    const e = JSON.parse(localStorage.getItem("exercises")) || [];

    setRoutines(r);
    setExercises(e);
  }, []);

  return (
    <div className="container">
      <h2>Mi Rutina</h2>

      {routines.map((r) => (
        <div key={r.id}>
          <h3>{r.client}</h3>

          {r.exercises.map((id) => {
            const ex = exercises.find((x) => x.id === id);

            return (
              <div key={id}>
                <p>{ex?.name}</p>

                {ex?.video && (
                  <iframe
                    width="300"
                    height="200"
                    src={ex.video.replace("watch?v=", "embed/")}
                    title="video"
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ClientView;