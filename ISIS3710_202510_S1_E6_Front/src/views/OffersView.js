import React, { useState } from "react";
import OfferCard from "../components/OfferCard";
import { Row, Col, Form } from "react-bootstrap";
import "../styles/OffersView.css";
import FilterPanel from "../components/FilterPanel";
import Notification from "../components/Notification";

const serviceData = [
  {
    idServicio: 1,
    role: "Técnico Electrodoméstico",
    service: "Reparación Nevera",
    description:
      "Desde ayer noté que no está enfriando bien, aunque el motor parece estar funcionando. También escucho un ruido...",
    image: "/assets/nevera.png",
    scheduledDate: "22/02/2025 15:30",
    address: "Calle 21 #5-31",
    clientImg: "/assets/persona.png",
    client: "Daniel Rodríguez",
    price: 5000,
  },
  {
    idServicio: 2,
    role: "Fontanero",
    service: "Reparación de tubería",
    description: "Fuga de agua en la cocina. Necesito una solución urgente.",
    image: "/assets/tuberia3.png",
    scheduledDate: "23/02/2025 10:00",
    address: "Av. Principal #10-50",
    clientImg: "/assets/persona2.png",
    client: "Ana Gómez",
    price: 8000,
  },
  {
    idServicio: 3,
    role: "Fontanero",
    service: "Reparación de tubería",
    description: "Fuga de agua en la cocina. Necesito una solución urgente.",
    image: "/assets/tuberia3.png",
    scheduledDate: "23/02/2025 10:00",
    address: "Av. Principal #10-50",
    clientImg: "/assets/persona2.png",
    client: "Ana Gómez",
    price: 160000,
  },
  {
    idServicio: 4,
    role: "Fontanero",
    service: "Reparación de tubería",
    description: "Fuga de agua en la cocina. Necesito una solución urgente.",
    image: "/assets/tuberia3.png",
    scheduledDate: "23/02/2025 10:00",
    address: "Av. Principal #10-50",
    clientImg: "/assets/persona2.png",
    client: "Ana Gómez",
    price: 20000,
  },
  {
    idServicio: 5,
    role: "Técnico Electrodoméstico",
    service: "Reparación Nevera",
    description:
      "Desde ayer noté que no está enfriando bien, aunque el motor parece estar funcionando. También escucho un ruido...",
    image: "/assets/nevera.png",
    scheduledDate: "22/02/2025 15:30",
    address: "Calle 21 #5-31",
    clientImg: "/assets/persona.png",
    client: "Daniel Rodríguez",
    price: 5000,
  },
  {
    idServicio: 6,
    role: "Técnico Electrodoméstico",
    service: "Reparación Nevera",
    description:
      "Desde ayer noté que no está enfriando bien, aunque el motor parece estar funcionando. También escucho un ruido...",
    image: "/assets/nevera.png",
    scheduledDate: "22/02/2025 15:30",
    address: "Calle 21 #5-31",
    clientImg: "/assets/persona.png",
    client: "Daniel Rodríguez",
    price: 5000,
  },
];

function OffersView() {
  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(serviceData);
  const [showFilter, setShowFilter] = useState(false);

  // Estado para notificaciones
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    profileImage: null,
    bellIcon: null,
  });

  const closeNotification = () => {
    setNotification({
      title: "",
      message: "",
      profileImage: null,
      bellIcon: null,
    });
  };

  // Filtrar según la búsqueda
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredServices(
      serviceData.filter(
        (service) =>
          service.service.toLowerCase().includes(query) ||
          service.role.toLowerCase().includes(query) ||
          service.client.toLowerCase().includes(query)
      )
    );
  };

  // Aplicar filtros desde el panel
  const handleApplyFilters = (filters) => {
    const { presupuestoMin, presupuestoMax, fecha, tipo } = filters;
    let newData = [...serviceData];

    if (presupuestoMin) {
      newData = newData.filter((item) => item.price >= Number(presupuestoMin));
    }
    if (presupuestoMax) {
      newData = newData.filter((item) => item.price <= Number(presupuestoMax));
    }
    if (fecha) {
      newData = newData.filter((item) => {
        const itemDate = item.scheduledDate.split("/");
        const fechaConversion =
          itemDate[2].split(" ")[0] + "-" + itemDate[1] + "-" + itemDate[0];
        return fechaConversion === fecha;
      });
    }
    if (tipo) {
      newData = newData.filter((item) =>
        item.service.toLowerCase().includes(tipo.toLowerCase())
      );
    }
    setFilteredServices(newData);
  };

  // Aceptar/Rechazar servicio con notificación
  const handleAccept = (id) => {
    const service = serviceData.find((s) => s.idServicio === id);
    if (service) {
      setNotification({
        title: "Servicio Aceptado",
        message: `Has aceptado la solicitud de ${service.client}.`,
        profileImage: service.clientImg,
        bellIcon: "/assets/bell.png",
      });
      setTimeout(closeNotification, 3000);
    }
  };

  const handleReject = (id) => {
    const service = serviceData.find((s) => s.idServicio === id);
    if (service) {
      setNotification({
        title: "Servicio Rechazado",
        message: `Has rechazado la solicitud de ${service.client}.`,
        profileImage: service.clientImg,
        bellIcon: "/assets/bell.png",
      });
      setTimeout(closeNotification, 3000);
    }
  };

  return (
    <div>
      <div className="container">
        <Row className="mt-3 offers-container">
          {/* 📌 Columna izquierda con las ofertas */}
          <Col xs={showFilter ? 6 : 12} lg={showFilter ? 9 : 12}>
            <h2 className="title text-center">Ofertas disponibles</h2>
            <br></br>
            <Row>
              {/* 🔍 Barra de búsqueda */}
              <div className="search-container d-flex justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="me-2"
                />
                <button
                  className="outline-secondary"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <i className="fas fa-sliders-h me-2"></i> Filtros
                </button>
              </div>
            </Row>
            <br></br>
            <Row className="gx-4 gy-4">
              {filteredServices.map((service) => (
                <Col key={service.idServicio} xs={12} sm={6} lg={4}>
                  <OfferCard
                    {...service}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                </Col>
              ))}
              {/* 📌 Columna derecha con el panel de filtros */}
              {showFilter && (
                <FilterPanel
                  onApplyFilters={handleApplyFilters}
                  onClose={() => setShowFilter(false)}
                />
              )}
            </Row>
          </Col>
        </Row>
      </div>

      {/* 🔔 Notificación */}
      <Notification {...notification} onClose={closeNotification} />
    </div>
  );
}

export default OffersView;
