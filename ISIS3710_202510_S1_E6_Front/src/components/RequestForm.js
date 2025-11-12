import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Mapa from "./Mapa";
import "../styles/RequestForm.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const RequestForm = ({ user }) => {
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [tipoServicio, setTipoServicio] = useState(null); // ahora guarda el objeto completo
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/servicios");
        setServicios(response.data);
      } catch (err) {
        console.error("Error cargando servicios:", err);
      } finally {
        setLoadingServicios(false);
      }
    };

    fetchServicios();
  }, []);

  const subirImagenYObtenerUrl = async (archivo) => {
    const formData = new FormData();
    formData.append('file', archivo);
    // Aquí reemplaza la URL con la de tu API o servicio que suba imágenes
    const response = await axios.post('https://api-de-tu-storage.com/upload', formData);
    return response.data.url; // URL pública de la imagen subida
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    alert("Debes iniciar sesión para enviar una solicitud.");
    return;
  }

  let imagenURL = "";

  if (imagen) {
    try {
      imagenURL = await subirImagenYObtenerUrl(imagen);
    } catch (error) {
      alert("Error al subir la imagen");
      return;
    }
  }

  // Convertir fecha a ISO (solo día)
  const fechaISO = fecha ? fecha.startOf('day').toISOString() : "";
  // Convertir hora a ISO completo (fecha ficticia con hora seleccionada)
  const horaISO = hora ? hora.toISOString() : "";

  const data = {
    descripcion,
    ubicacionServicio: direccion,
    fechaDeseada: fechaISO,
    horaDeseada: horaISO,
    imagenUrl: imagenURL,
    estado: "En Proceso",
    servicioId: tipoServicio.idServicio,
    usuarioId: user.idUsuario,
  };

  try {
    // Crear la oferta
    await axios.post("http://localhost:3000/api/v1/ofertas", data);


    alert("Solicitud publicada y agendada con éxito");
    console.log("Solicitud enviada:", data);
    
    // Limpiar campos
    setTipoServicio(null);
    setDescripcion("");
    setImagen(null);
    setDireccion("");
    setFecha(null);
    setHora(null);
  } catch (err) {
    console.error("Error enviando solicitud o creando agendamiento:", err);
    alert("Hubo un error al publicar tu solicitud o al crear el agendamiento.");
  }
};

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div className="row justify-content-center align-items-center contenedorForm" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="col-auto p-4 order-1">
          <div className="bg-white p-4 shadow contenedorFormulario" style={{ width: "350px" }}>
            <h2 className="mb-4 tituloForm">
              Publica tu <span className="SolicitudTexto">Solicitud</span>
            </h2>
            <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
              <div className="mb-3 seleccionaServicio">
                <i className="fas fa-wrench"></i>
                <select
                  className="form-select border-0"
                  id="tipoServicio"
                  value={tipoServicio?.idServicio || ""}
                  onChange={(e) => {
                    const servicioSeleccionado = servicios.find(
                      (s) => s.idServicio.toString() === e.target.value
                    );
                    setTipoServicio(servicioSeleccionado);
                  }}
                >
                  <option value="" disabled>
                    {loadingServicios ? "Cargando servicios..." : "Selecciona el Tipo de Servicio"}
                  </option>
                  {servicios.map((item) => (
                    <option key={item.idServicio} value={item.idServicio}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control descripcionForm"
                  id="descripcion"
                  rows="3"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3 cargarImagenForm">
                <input
                  type="file"
                  id="imagen"
                  className="input-file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
                <label htmlFor="imagen" className="btn-custom">
                  <i className="fas fa-upload"></i> Cargar imagen
                </label>
              </div>

              <div className="mb-3 ubicacionForm">
                <i className="fas fa-map-marker-alt"></i>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  placeholder="Ingrese su ubicación"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>

              <div className="mb-3 solicitudFechaForm">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Selecciona la fecha"
                    className="w-100 DatePickerForm"
                    value={fecha}
                    onChange={(value) => setFecha(value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& .MuiInputLabel-root": {
                        transition: "opacity 0s ease-in-out",
                        left: "38px",
                      },
                      "& .MuiInputLabel-shrink": { opacity: 0 },
                      "& .MuiOutlinedInput-root": { flexDirection: "row-reverse" },
                      "& .MuiSvgIcon-root": { color: "black" },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-3 solicitudFechaForm">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Selecciona la hora"
                    className="w-100 DatePickerForm"
                    value={hora}
                    onChange={(newValue) => setHora(newValue)}
                    ampm={true}
                    renderInput={(params) => <input {...params} className="form-control" />}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& .MuiInputLabel-root": {
                        transition: "opacity 0s ease-in-out",
                        left: "38px",
                      },
                      "& .MuiInputLabel-shrink": { opacity: 0 },
                      "& .MuiOutlinedInput-root": { flexDirection: "row-reverse" },
                      "& .MuiSvgIcon-root": { color: "black" },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <button type="submit" className="btn btn-primary w-100 botonPublicar">
                Publicar
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md p-0 d-flex justify-content-center align-items-center order-2">
          <div className="mapaContenedor" style={{ width: "720px", height: "700px" }}>
            <Mapa ancho="100%" altura="100%" direccion={direccion} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
