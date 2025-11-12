import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MainView from "./views/MainView";
import RequestServiceView from "./views/RequestServiceView";
import RegisterScreenView from "./views/RegisterScreenView";
import LoginScreenView from "./views/LoginScreenView";
import UserProfileView from "./views/UserProfileView";
import WorkerView from "./views/WorkerView";
import AboutUsView from "./views/AboutUsView";
import SearchBar from "./components/SearchBar"; 
import Footer from "./components/Footer";
import PropTypes from "prop-types";
import Forms from "./components/Forms";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("Usuario recuperado del localStorage:", JSON.parse(storedUser));
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (userData) => {
    localStorage.setItem("loggedUser", JSON.stringify(userData));
    setUser(userData);
  };

  const [ubicacion] = useState([
    { idUbicacion: 1, ubicacion: "Bogotá" },
    { idUbicacion: 2, ubicacion: "Medellín" },
  ]);

  const [servicio] = useState([
    { idServicio: 1, servicio: "Plomería" },
    { idServicio: 2, servicio: "Electricidad" },
  ]);

  const [userHistory] = useState([
    {
      idServicio: 1,
      servicio: "Reparación de nevera",
      status: "En Proceso",
      date: "2025-02-22",
      time: "15:30",
      price: 120000,
      professionalImg: "/assets/profesional.png",
    },
    {
      idServicio: 2,
      servicio: "Reparación de tubería",
      status: "Completado",
      date: "2025-02-23",
      time: "09:00",
      price: 80000,
      professionalImg: "/assets/profesional.png",
    },
  ]);

  return (
    <Router>
      <MainComponent
        user={user}
        setUser={setUser}
        onLogin={handleLogin} 
        servicios={servicio}
        ciudades={ubicacion}
        userHistory={userHistory}
      />
    </Router>
  );
}

function MainComponent({ user, setUser, onLogin, servicios, ciudades, userHistory }) {
  const location = useLocation();

  // Rutas donde NO se muestra el SearchBar
  const hideSearchBarRoutes = ["/pagina-trabajador", "/iniciarSesion", "/registrarse"];

  return (
    <div className="App">
      {!hideSearchBarRoutes.includes(location.pathname) && (
        <SearchBar user={user} setUser={setUser} servicios={servicios} ciudades={ciudades} />
      )}

      <Routes>
        <Route path="/" element={<MainView user={user} servicios={servicios} ciudades={ciudades} />} />
        <Route path="/solicitarServicio" element={<RequestServiceView user={user} />} />
        <Route path="/sobrenosotros" element={<AboutUsView servicios={servicios} ciudades={ciudades} />} />
        <Route path="/iniciarSesion" element={<LoginScreenView onLogin={onLogin} />} />
        <Route path="/registrarse" element={<RegisterScreenView onLogin={onLogin} />} />
        <Route path="/registrarse-trabajador" element={<Forms user={user} />} />

        {/* Validar user para esta ruta */}
        <Route
          path="/pagina-usuario"
          element={
            user ? (
              <UserProfileView user={user} />
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>
                Cargando usuario o por favor inicia sesión...
              </div>
            )
          }
        />

        {/* Si WorkerView no necesita user, lo dejamos igual */}
        <Route path="/pagina-trabajador" element={<WorkerView user={user} />} />
      </Routes>

      {!hideSearchBarRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}


MainComponent.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  servicios: PropTypes.array.isRequired,
  ciudades: PropTypes.array.isRequired,
  userHistory: PropTypes.array.isRequired,
};

export default App;
