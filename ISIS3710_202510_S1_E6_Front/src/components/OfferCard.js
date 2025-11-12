import React from "react";
import "../styles/OfferCard.css";
import PropTypes from "prop-types";

const OfferCard = ({
  idServicio,
  role,
  service,
  description,
  image,
  scheduledDate,
  address,
  clientImg,
  client,
  onAccept,
  onReject
}) => {

  const handleAccept = () => {
    if (onAccept) onAccept(idServicio);
  };

  const handleReject = () => {
    if (onReject) onReject(idServicio);
  };

  return (
    <div className="offer-card">
      <div className="service-header row d-flex align-items-start">
        <div className="col-12 col-xl-6 text-start">
          <p className="service-role">{role}</p>
          <h2 className="service-name">{service}</h2>
          <p className="description">{description}</p>
        </div>
        <div className="col-sm-12 col-xl-6 d-flex justify-content-center">
          <img
            className="service-image img-fluid"
            src={image}
            alt="Service"
            style={{ objectFit: "cover", maxWidth: "100%" }}
          />
        </div>
      </div>

      <div className="info-section">
        <div className="info">
          <div>
            <p className="label">Fecha programada</p>
            <p className="data">{scheduledDate}</p>
          </div>
        </div>
        <div className="info">
          <div>
            <p className="label">Dirección</p>
            <p className="data">{address}</p>
          </div>
        </div>
      </div>

      <div className="client-section d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center flex-grow-1">
          <img className="client-img img-fluid me-3" src={clientImg} alt="Client" />
          <div>
            <p className="data mb-0">Cliente</p>
            <p className="label mb-0">{client}</p>
          </div>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <span className="icon me-3"><i className="fas fa-phone"></i></span>
          <span className="icon"><i className="fas fa-comment-alt"></i></span>
        </div>
      </div>

      <div className="buttons d-flex justify-content-between mt-3">
        <button className="btn btn-success accept" onClick={handleAccept}>
          Aceptar
        </button>
        <button className="btn btn-danger reject" onClick={handleReject}>
          Rechazar
        </button>
      </div>
    </div>
  );
};

OfferCard.propTypes = {
  idServicio: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  scheduledDate: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  clientImg: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
};

export default OfferCard;
