import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/ProfesionalMap";
import OffersView from "./OffersView";
import WorkerHistory from "../components/WorkerHistory";

function WorkerView({user}) {
  const [selectedView, setSelectedView] = useState("Dashboard");
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/ofertas/disponibles");
        const data = await res.json();
        setServiceData(data);
        console.log("Servicios obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      }
    };

    obtenerServicios();
  }, []);

  let content;
  switch (selectedView) {
    case "Servicios":
      content = <div className="main-content"><OffersView /></div>;
      break;
    case "Calendario":
      content = <div className="main-content"><WorkerHistory serviceData={serviceData} /></div>;
      break;
    default:
      content = <div className="main-content"><Dashboard serviceData={serviceData} user={user} /></div>;
      break;
  }

  return (
    <div className="worker-container">
      <Navbar setSelectedView={setSelectedView} />
      <div className="worker-content">{content}</div>
    </div>
  );
}

export default WorkerView;
