import Clients from "./pages/Clients";
import Layout from "./components/Layout";
import CrearUsuario from "./pages/CrearUsuario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Exercises from "./pages/Exercises";
import Routines from "./pages/Routines";
import ClientView from "./pages/ClientView";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Crear usuario inicial si no existe
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
const defaultUser = {
  dni: "42556834",
  password: "admin123",
  role: "admin",
};
      localStorage.setItem("users", JSON.stringify([defaultUser]));
    }

    const savedAuth = localStorage.getItem("authUser");
    if (savedAuth) {
      setCurrentUser(JSON.parse(savedAuth));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (dni, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.dni === dni && u.password === password
    );

    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login login={login} />} />
  <Route path="/clients" element={<Clients />} />
  <Route path="/exercises" element={<Exercises />} />
  <Route path="/routines" element={<Routines />} />
  <Route path="/client" element={<ClientView />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Layout currentUser={currentUser} logout={logout}>
          <Dashboard currentUser={currentUser} />
        </Layout>
      </ProtectedRoute>
    }
  />

  <Route
  path="/crear-usuario"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Layout currentUser={currentUser} logout={logout}>
        {currentUser?.role === "admin" ? (
          <CrearUsuario currentUser={currentUser} />
        ) : (
          <h2>No tenés permisos para acceder acá</h2>
        )}
      </Layout>
    </ProtectedRoute>
  }
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;