import React, { useEffect, useState } from "react";
import "../styles/OfferCard.css";
import axios from "axios";

function WorkerHistory() {
  const [activeTab, setActiveTab] = useState("En progreso");
  const [agendamientos, setAgendamientos] = useState([]);

  useEffect(() => {
    const fetchAgendamientos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/agendamientos/estado/${activeTab}`
        );
        setAgendamientos(response.data);
      } catch (err) {
        console.error("Error al cargar agendamientos:", err);
        setAgendamientos([]);
      }
    };

    fetchAgendamientos();
  }, [activeTab]);

  const handleCancelar = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/agendamientos/${id}/estado/Cancelado`
      );
      setAgendamientos((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error al cancelar agendamiento:", error);
    }
  };

  const handleFinalizar = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/agendamientos/${id}/estado/Completado`
      );
      setAgendamientos((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error al finalizar agendamiento:", error);
    }
  };

  return (
    <div className="my-requests-container px-4">
      <h2 className="text-center text-2xl font-semibold my-4">
        Mis Solicitudes
      </h2>

      <div className="status-tabs">
        {["Completado", "En progreso", "Cancelado"].map((status) => {
          const statusClass =
            activeTab === status
              ? `status-${status.toLowerCase().replace(" ", "")}`
              : "status-inactive";

          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`status-button ${statusClass}`}
            >
              {status}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-start gap-4 mt-4">
        {agendamientos.length === 0 ? (
          <p className="text-center w-full text-gray-500">
            No hay servicios en esta categoría.
          </p>
        ) : (
          agendamientos.map((ag) => (
            <div
              key={ag.id}
              className="offer-card"
              style={{ maxWidth: "450px", width: "100%" }}
            >
              <div className="service-header row d-flex align-items-start">
                <div className="col-12 col-xl-6 text-start">
                  <p className="service-role">{ag.trabajador?.especialidad}</p>
                  <h2 className="service-name">
                    {ag.oferta?.servicio?.nombre}
                  </h2>
                  <p className="description">{ag.oferta?.descripcion}</p>
                </div>
                <div className="col-sm-12 col-xl-6 d-flex justify-content-center">
                  <img
                    className="service-image img-fluid"
                    src={ag.oferta?.imagenUrl || "/placeholder.png"}
                    alt="Service"
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      maxHeight: "140px",
                    }}
                  />
                </div>
              </div>

              <div className="info-section">
                <div className="info">
                  <div>
                    <p className="label">Fecha programada</p>
                    <p className="data">
                      {new Date(ag.oferta?.fechaDeseada).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div>
                    <p className="label">Dirección</p>
                    <p className="data">{ag.oferta?.ubicacionServicio}</p>
                  </div>
                </div>
              </div>

              <div className="client-section d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-grow-1">
                  <div>
                    <p className="label mb-0">Cliente</p>
                    <p className="data mb-0">
                      {ag.usuario?.nombre || "Cliente anónimo"}
                    </p>
                  </div>
                </div>

                {/* Solo muestra iconos si NO está completado */}
                {activeTab !== "Completado" && (
                  <div className="d-flex mt-2 mt-md-0">
                    <span className="icon me-3">
                      <i className="fas fa-phone"></i>
                    </span>
                    <span className="icon">
                      <i className="fas fa-comment-alt"></i>
                    </span>
                  </div>
                )}
              </div>

              {/* Botón de acción solo para En progreso */}
              {activeTab === "En progreso" && (
                <div className="buttons d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary accept"
                    onClick={() => handleFinalizar(ag.id)}
                  >
                    Marcar como completado
                  </button>
                  <button
                    className="btn btn-danger reject"
                    onClick={() => handleCancelar(ag.id)}
                  >
                    Cancelar servicio
                  </button>
                </div>
              )}

              {/* Mostrar reseña si está completado */}
              {activeTab === "Completado" && ag.reseña && (
                <div className="review-section mt-3 p-3 border-top">
                  <p className="label mb-1">Reseña del cliente</p>
                  <p className="data fst-italic mb-2">
                    "{ag.reseña.comentario}"
                  </p>
                  <div className="stars text-warning">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fas fa-star ${index < ag.reseña.calificacion
                          ? "text-warning"
                          : "text-muted"
                          }`}
                      ></i>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkerHistory;
