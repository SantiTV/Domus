import React from "react";
import "../styles/ProfessionalService.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProfessionalService(props) {
  const { servicios } = props;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Evita recarga
    navigate("/solicitarServicio");
  };

  const handleJoin = () => {
    navigate("/registrarse-trabajador");
  };

  const handleWork = () => {
    navigate("/pagina-trabajador"); 
  };
  
  console.log("Usuario:", props.user);
  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-6 p-3">
          <h1 className="titulo-pantalla-principal text-start">
            Profesionales A Un <span>Click</span> De Distancia
          </h1>
          <div className="mt-5 text-start">
            <button className="btn boton-pide-un-experto me-3" onClick={handleSearch}>Pide Un Experto</button>
              {props.user === null || props.user?.roles === "cliente" ? (
                <button className="btn boton-unete" onClick={handleJoin}>
                  Únete Como Experto
                </button>
              ) : (
                props.user?.roles === "trabajador" && (
                  <button className="btn boton-hora-trabajar" onClick={handleWork}>
                    Hora de Trabajar
                  </button>
                )
              )}
          </div>
        </div>
        <div className="col-md-6 text-white p-3 text-center">
          <img src="/assets/imagenprincipal.svg" alt="Profesional" className="img-fluid" />
        </div>
      </div>

      {/* Formulario */}
      <div className="form-container mt-5">
        <form className="row g-2 d-flex align-items-center justify-content-between w-100" onSubmit={handleSearch}>
          <div className="col-md-3 col-12 d-flex align-items-center">
            <div className="ubicacionForm w-100 d-flex align-items-center px-3">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" className="border-0 w-100" placeholder="Ingrese su Ubicación" />
            </div>
          </div>

          <div className="col-md-3 col-12 d-flex align-items-center">
            <div className="seleccionaServicio w-100 d-flex align-items-center px-3">
              <i className="fas fa-wrench me-2"></i>
              <select className="form-select border-0 w-100">
                <option value="" disabled selected>
                  Seleccione El Tipo De Servicio
                </option>
                {servicios?.map((item) => (
                  <option key={item.idServicio} value={item.idServicio}>
                    {item.servicio}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-3 col-12 d-flex align-items-center">
            <div className="solicitudFechaForm w-100 d-flex align-items-center DatePicker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-100"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiInputLabel-root": { transition: "opacity 0s ease-in-out" },
                    "& .MuiInputLabel-shrink": { opacity: 0 },
                    "& .MuiOutlinedInput-root": { flexDirection: "row-reverse", left: "-17px" },
                    "& .MuiSvgIcon-root": { color: "black" },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="col-md-3 col-12 d-flex align-items-center">
            <button type="submit" className="btn btn-publicar w-100 h-100">
              Buscar Profesional
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ProfessionalService.propTypes = {
  servicios: PropTypes.array.isRequired,
  user: PropTypes.object,
};
