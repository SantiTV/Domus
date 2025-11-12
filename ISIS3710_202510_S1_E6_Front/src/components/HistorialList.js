import React, { useEffect, useState } from "react";
import UserHistory from "./UserHistory";
import "../styles/HistorialList.css";
import PropTypes from "prop-types";
import axios from "axios";
import dayjs from "dayjs";

function HistorialList(props) {
  const [userOffers, setUserOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!props.user) return;

    const fetchUserOffers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/oferta-usuario/${props.user}`
        );
        setUserOffers(response.data);
        console.log("Ofertas del usuario:", response.data);
      } catch (err) {
        setError("No tienes servicios solicitados aún.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOffers();
  }, [props.user]);

  if (loading) return <p>Cargando ofertas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container d-flex flex-column align-items-start p-5 bg-white shadow contenedor-principal">
      <h3 className="fw-bold text-start titulo">¡Mis Servicios Solicitados!</h3>
      <p className="text-muted text-start">
        Consulta el estado de tus solicitudes y revisa el historial de los servicios que has pedido.
      </p>
      <hr className="my-3" />

      <div className="gap-3 w-100">
        {userOffers.length === 0 ? (
          <p>No tienes servicios solicitados aún.</p>
        ) : (
          userOffers.map((item) => (
            <UserHistory
              servicio={item.servicio.nombre}
              key={item.idOferta}
              status={item.estado}
              date={dayjs(item.fechaDeseada).format("DD/MM/YYYY")}
              time={  dayjs(item.horaDeseada).isValid()
                ? dayjs(item.horaDeseada).format("hh:mm A")
                : item.horaDeseada}
              price={item.servicio.precioBase}
            />
          ))
        )}
      </div>
    </div>
  );
}

HistorialList.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default HistorialList;
