import { useEffect, useState } from "react";

export default function Forms({ user }) {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [resume, setResume] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [ubicacion, setUbicacion] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/servicios");
        const data = await res.json();
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      }
    };

    obtenerServicios();
  }, []);

  const toggleJob = (job) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  const handleFileChange = (event, setter) => {
    setter(event.target.files[0]);
  };

  const downloadTerms = () => {
    const link = document.createElement("a");
    link.href = "/path/to/terms.pdf";
    link.download = "Terminos_y_Condiciones.pdf";
    link.click();
  };

  const handleSubmit = async () => {
    if (selectedJobs.length === 0) {
      alert("Por favor selecciona al menos un servicio.");
      return;
    }

    const daata = {
      especialidad: selectedJobs.length > 0 ? selectedJobs.join(", ") : "Sin especificar",
      disponibilidad: disponibilidad || "Sin especificar",
      ubicacion: ubicacion || "Sin especificar",
      hojaDeVida: resume ? resume.name : "archivo.pdf", // solo se envía el nombre del archivo
    };


    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/usuarios/${user}/convertir-a-trabajador`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(daata),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }


      const data = await response.json();
      alert("¡Ya eres trabajador!");
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al enviar la información:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        alert(`Error del servidor: ${error.response.status}`);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor.");
        alert("No se recibió respuesta del servidor.");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
        alert("Error al configurar la solicitud.");
      }
    }
  };


  return (

    <div className="container-fluid d-flex flex-column flex-md-row align-items-stretch">
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center px-5 bg-white">
        <h2 className="text-inicio fw-bold mb-3 text-center">Bienvenido</h2>
        <p className="text-muted text-center">
          Completa los siguientes pasos para empezar a generar ganancias
        </p>
        <h2 className="text-segundo fw-bold mb-3 text-center">
          Elige cómo quieres ganar dinero
        </h2>

        <div className="d-flex justify-content-center mb-3 flex-wrap">
          {servicios.map((servicio) => (
            <button
              key={servicio.idServicio}
              className={`btn m-1 ${selectedJobs.includes(servicio.nombre)
                ? "btn-primary"
                : "btn-custom-outline"
                } rounded-pill`}
              onClick={() => toggleJob(servicio.nombre)}
            >
              {servicio.nombre}
            </button>
          ))}
        </div>

        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="disponibilidad">
            Disponibilidad
          </label>
          <input
            id="disponibilidad"
            type="text"
            className="form-control rounded-pill"
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="ubicacion">
            Ubicación
          </label>
          <input
            id="ubicacion"
            type="text"
            className="form-control rounded-pill"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="personal-info">
            Agregue una fotocopia de su cédula
          </label>
          <input
            id="personal-info"
            type="file"
            className="form-control rounded-pill"
            onChange={(e) => handleFileChange(e, setPersonalInfo)}
          />
          {personalInfo && <p className="text-success">{personalInfo.name}</p>}
        </div>

        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="resume">
            Hoja de Vida
          </label>
          <input
            id="resume"
            type="file"
            className="form-control rounded-pill"
            onChange={(e) => handleFileChange(e, setResume)}
          />
          {resume && <p className="text-success">{resume.name}</p>}
        </div>

        <button
          data-testid="download-terms"
          className="btn btn-secondary w-100 rounded-pill mb-2"
          onClick={downloadTerms}
        >
          Términos y Condiciones
        </button>

        <button
          className="btn btn-success w-100 rounded-pill"
          onClick={handleSubmit}
        >
          Enviar solicitud
        </button>
      </div>

      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
        <img
          src="/assets/logIn.png"
          alt="delivery"
          className="img-fluid"
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}

