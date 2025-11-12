import { useState, useEffect } from "react";
import "../styles/SearchBar.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SearchBar(props) {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const navigate = useNavigate();

  // Inicializar ciudad seleccionada
  useEffect(() => {
    if (props.ciudades.length > 0) {
      setCiudadSeleccionada(props.ciudades[0].ubicacion);
    }
  }, [props.ciudades]);

  const handleSearch = () => {
    navigate("/");
  };

  const handleServiceSelect = (servicio) => {
    navigate(`/solicitarServicio?servicio=${encodeURIComponent(servicio)}`);
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.removeItem("loggedUser");
      props.setUser(null);
      navigate("/");
    }
  };

  // Elementos comunes del dropdown
  const ciudadDropdownItems = props.ciudades.map((ciudad) => (
    <button
      key={ciudad.idUbicacion}
      className="dropdown-item"
      type="button"
      onClick={() => setCiudadSeleccionada(ciudad.ubicacion)}
    >
      {ciudad.ubicacion}
    </button>
  ));

  const serviciosDropdownItems = props.servicios.map((item) => (
    <button
      key={item.idServicio}
      className="dropdown-item"
      type="button"
      onClick={() => handleServiceSelect(item.servicio)}
    >
      {item.servicio}
    </button>
  ));

  return (
    <nav className="navbar navbar-expand-lg d-flex align-items-center pt-5">
      <button
        className="navbar-brand ms-5 me-4 btn p-0 border-0 bg-transparent"
        onClick={handleSearch}
        style={{ outline: "none", boxShadow: "none", userSelect: "none" }}
      >
        <p className="logo">
          Dom<span className="usColor">US</span>
        </p>
      </button>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          {/* Dropdown ciudad - Estructura original mantenida */}
          <li className="nav-item dropdown me-4">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="navbarDropdownCiudad"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-map-marker-alt icon-ubicacion"></i>{" "}
              {ciudadSeleccionada || "Seleccionar ciudad"}
            </button>
            <div className="dropdown-menu">
              {props.ciudades.length > 0 ? ciudadDropdownItems : (
                <span className="dropdown-item disabled">No hay ciudades disponibles</span>
              )}
            </div>
          </li>

          {/* Dropdown servicios - Estructura original mantenida */}
          <li className="nav-item dropdown opcionesIzquierda me-4">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="navbarDropdownServicios"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Servicios
            </button>
            <div className="dropdown-menu">
              {props.servicios.length > 0 ? serviciosDropdownItems : (
                <span className="dropdown-item disabled">No hay servicios disponibles</span>
              )}
            </div>
          </li>

          {/* Enlace Quiénes Somos - Mantenido igual */}
          <li className="nav-item me-4">
            <a className="nav-link" href="/sobrenosotros">
              ¿Quiénes Somos?
            </a>
          </li>
        </ul>

        {/* Botones de usuario - Estructura original mantenida con mejoras funcionales */}
        <div className="d-flex gap-3 me-lg-5 justify-content-center pt-3 pt-lg-0">
          {props.user ? (
            <div className="d-flex align-items-center gap-3">
              <button 
                className="btn" 
                onClick={() => navigate("/pagina-usuario")}
                title="Ir a mi perfil"
              >
                <p className="opcionSesion">{props.user.nombre}</p>
              </button>
              <button 
                className="btn" 
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <p className="iniciarSesion">Cerrar Sesión</p>
              </button>
            </div>
          ) : (
            <>
              <button 
                className="btn" 
                onClick={() => navigate("/registrarse")}
                title="Crear nueva cuenta"
              >
                <p className="opcionSesion">Registrarse</p>
              </button>
              <button 
                className="btn" 
                onClick={() => navigate("/iniciarSesion")}
                title="Acceder a mi cuenta"
              >
                <p className="iniciarSesion">Iniciar Sesión</p>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

SearchBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  servicios: PropTypes.arrayOf(
    PropTypes.shape({
      idServicio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      servicio: PropTypes.string.isRequired,
    })
  ).isRequired,
  ciudades: PropTypes.arrayOf(
    PropTypes.shape({
      idUbicacion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      ubicacion: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchBar;