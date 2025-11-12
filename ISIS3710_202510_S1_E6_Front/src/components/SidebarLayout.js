import React, { useState } from "react";
import "../styles/SidebarLayout.css";
import HistorialList from "./HistorialList";
import PropTypes from "prop-types";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`; // Color HSL con saturación y luminosidad fija
  return color;
}

function SidebarLayout(props) {
  const [selectedOption, setSelectedOption] = useState("Historial");

  let content;
  switch (selectedOption) {
    case "Ajustes":
      content = <div><img src="/assets/pantalla.png" alt="Pantalla" /></div>;
      break;
    case "Historial":
      content = <HistorialList user={props.user.idUsuario} />;
      break;
    case "Ayuda":
      content = <div><img src="/assets/pantalla.png" alt="Pantalla" /></div>;
      break;
    default:
      content = <p>Selecciona una opción</p>;
  }

  // Color generado según el nombre del usuario
  const avatarColor = props.user && props.user.nombre ? stringToColor(props.user.nombre) : "#ccc";

  return (
    <div className="container my-4">
      <div className="row align-items-stretch">
        {/* SIDEBAR */}
        <div className="col-12 col-md-4 col-lg-3 p-3 sidebar-container d-flex flex-column">
          <div className="d-flex flex-column align-items-center text-center mb-4">
            <div className="d-flex align-items-center mt-4">
              <div className="me-3">
                <div
                  className="avatar d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: avatarColor }}
                >
                  {props.user && props.user.nombre ? props.user.nombre.charAt(0).toUpperCase() : ""}
                </div>
              </div>
              <div className="d-flex flex-column text-start">
                <small className="text-muted">Perfil</small>
                <h6 className="fw-bold m-0">{props.user.nombre}</h6>
              </div>
            </div>
          </div>

          {/* Botones de menú accesibles */}
          <div className="d-flex flex-column">
            <button
              type="button"
              className={`py-2 px-2 menu-item text-start btn w-100 ${
                selectedOption === "Ajustes" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("Ajustes")}
            >
              <i className="fas fa-wrench me-2"></i>{" "}
              Ajustes
            </button>
            <hr className="menu-divider" />

            <button
              type="button"
              className={`py-2 px-2 menu-item text-start btn w-100 ${
                selectedOption === "Historial" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("Historial")}
            >
              <i className="fas fa-history me-2"></i>{" "}
              Historial
            </button>
            <hr className="menu-divider" />

            <button
              type="button"
              className={`py-2 px-2 menu-item text-start btn w-100 ${
                selectedOption === "Ayuda" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("Ayuda")}
            >
              <i className="fas fa-exclamation-circle me-2"></i>{" "}
              Ayuda
            </button>
            <hr className="menu-divider" />
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column flex-grow-1 mt-5 mt-md-0">
          {content}
        </div>
      </div>
    </div>
  );
}

SidebarLayout.propTypes = {
  userHistory: PropTypes.array.isRequired,
};

export default SidebarLayout;
