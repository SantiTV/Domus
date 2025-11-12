import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/ServiceCard.css";
import FilterPanel from "./FilterPanel";
import Mapa from "./Mapa";
import Notification from "./Notification";
import ServiceCard from "./ServiceCard";

function Dashboard({ serviceData, user }) {

  const [showFilter, setShowFilter] = useState(false);
  const [filteredServices, setFilteredServices] = useState(serviceData);

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationUserImage, setNotificationUserImage] = useState(null);
  const [notificationBellIcon, setNotificationBellIcon] = useState(null);

  const closeNotification = () => {
    setNotificationTitle("");
    setNotificationMessage("");
    setNotificationUserImage(null);
    setNotificationBellIcon(null);
  };

  console.log("Filtered Services:", serviceData);
  const handleOpenFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  const handleApplyFilters = (filters) => {
    const { presupuestoMin, presupuestoMax, fecha, tipo, radio } = filters;
    let newData = [...serviceData];

    if (presupuestoMin) {
      newData = newData.filter((item) => item.price >= Number(presupuestoMin));
    }
    if (presupuestoMax) {
      newData = newData.filter((item) => item.price <= Number(presupuestoMax));
    }
    if (fecha) {
      newData = newData.filter((item) => {
        const itemDate = item.scheduledDate.split("T")[0];
        return itemDate === fecha;
      });
    }
    if (tipo) {
      newData = newData.filter((item) =>
        item.service.toLowerCase().includes(tipo.toLowerCase())
      );
    }
    if (radio) {
      const baseLat = 4.60971;
      const baseLng = -74.08175;
      newData = newData.filter((item) => {
        const distance = calcDistance(baseLat, baseLng, item.lat, item.lng);
        return distance <= Number(radio);
      });
    }
    setFilteredServices(newData);
  };

  const calcDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };



  const handleCardAccept = async (ofertaId, usuarioId, trabajadorId) => {
    console.log("Iniciando creación de agendamiento...");

    console.log('Worker ID:', trabajadorId);
    console.log('User ID:', usuarioId);

    // 1. Crear el agendamiento
    console.log("Current user ID when clicking:", user?.idUsuario);


    const resAgendamiento = await axios.post("http://localhost:3000/api/v1/agendamientos", {
      oferta: { id: ofertaId },
      usuario: { id: usuarioId },
      trabajador: { id: trabajadorId },
    });

    console.log("Respuesta del servidor al crear agendamiento:", resAgendamiento.data);

    const agendamientoId = resAgendamiento.data.id;

    if (!agendamientoId) {
      console.log("No se recibió un ID válido para el agendamiento");
      alert("No se pudo crear el agendamiento correctamente, intente de nuevo.");
      return;
    }

    console.log("ID del agendamiento recibido:", agendamientoId);


  };





  const handleCardReject = (serviceId) => {
    const service = serviceData.find((s) => s.idServicio === serviceId);
    if (service) {
      setNotificationTitle("Servicio Rechazado");
      setNotificationMessage(`Has rechazado la solicitud de ${service.client}.`);
      setNotificationUserImage(service.clientImg);
      setNotificationBellIcon("/assets/bell.png");
      setTimeout(() => closeNotification(), 3000);
    }
  };

  return (
    <div className="container-fluid dashboard">
      <div className="row">
        {/* Sidebar: se muestran las tarjetas de solicitudes */}
        <div className="col-12 col-md-4 sidebar d-flex flex-column">
          <div className="search-bar position-relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control search-input pe-5"
            />
            <button
              className="btn position-absolute end-0 top-50 translate-middle-y me-3 border-0 bg-transparent"
              data-testid="open-filter"
              onClick={handleOpenFilter}
            >
              <i className="fas fa-sliders-h text-muted"></i>
            </button>
          </div>
          <h2 className="requests-title">Solicitudes</h2>
          <div className="sidebar-content flex-grow-1">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                idServicio={service.id}
                role={
                  "Precio: " +
                  new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(service.servicio.precioBase)
                }
                service={service.servicio.nombre}
                description={service.descripcion}
                image={service.imagenUrl}
                scheduledDate={service.fechaDeseada + " " + service.horaDeseada}
                address={service.ubicacionServicio}
                clientImg={service.clientImg}
                client={service.usuario.nombre}
                onAccept={() => handleCardAccept(service.id, service.usuario.idUsuario, user?.idUsuario)}
                onReject={handleCardReject}

              />
            ))}
          </div>
        </div>
        {/* Columna derecha: mapa y panel de filtros */}
        <div
          className="col-12 col-md-8 map-container"
          style={{
            position: "relative",
            backgroundColor: "#f0f0f0",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Mapa
            ancho="100%"
            altura="100%"
            ubicaciones={filteredServices.map(service => ({
              direccion: service.ubicacionServicio,
              usuario: service.usuario.nombre,
              descripcion: service.descripcion
            }))}
          />
          {showFilter && (
            <FilterPanel
              onApplyFilters={handleApplyFilters}
              onClose={handleCloseFilter}
            />
          )}
        </div>
      </div>
      {/* Componente de notificación en la esquina inferior derecha */}
      <Notification
        title={notificationTitle}
        message={notificationMessage}
        profileImage={notificationUserImage}
        bellIcon={notificationBellIcon}
        onClose={closeNotification}
      />
    </div>
  );
}

Dashboard.propTypes = {
  serviceData: PropTypes.arrayOf(
    PropTypes.shape({

    })
  ).isRequired,
};

export default Dashboard;

