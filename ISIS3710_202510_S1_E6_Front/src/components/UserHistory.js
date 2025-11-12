import React, { useState } from "react";
import "../styles/UserHistory.css";
import ReviewModal from "./ReviewModal";
import ReviewSummaryModal from "./ReviewSummaryModal"; 
import PropTypes from "prop-types";

function UserHistory(props) {
  let statusClass = "";

  if (props.status === "En Proceso") {
    statusClass = "status-en-proceso";
  } else if (props.status === "Completado") {
    statusClass = "status-completado";
  } else {
    statusClass = "status-cancelado";
  }

  
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [showReviewSummary, setShowReviewSummary] = useState(false);

  const handleOpenReview = () => setIsReviewOpen(true);
  const handleCloseReview = () => setIsReviewOpen(false);


  const handleSubmitReview = (rating, reviewText) => {
    setReviewData({ rating, reviewText });
    setIsReviewOpen(false);
  };

  return (
    <div className="user-history-container p-4">
      <div className="row">
        <div className="col text-start">
          <h2 className="mb-0 titulo-historial">{props.servicio}</h2>
        </div>
        <div className="col text-end">
          <span className={`badge user-history-status ${statusClass}`}>
            {props.status}
          </span>
        </div>
      </div>

      <div className="row mt-3 mb-4">
        <div className="col-auto">
          <p className="mb-0 user-history-description">
            <strong>Fecha:</strong> {props.date}
          </p>
        </div>
        <div className="col-auto">
          <p className="mb-0 user-history-description">
            <strong>Hora:</strong> {props.time}
          </p>
        </div>
        <div className="col-auto">
          <p className="mb-0 user-history-description">
            <strong>Precio:</strong> ${props.price}
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-auto">
          <button
            className="btn user-history-button"
            onClick={() => {
              if (reviewData) {
                setShowReviewSummary(true);
              } else {
                alert("No hay reseña disponible.");
              }
            }}
          >
            Resumen
          </button>
        </div>
        {props.status === "Completado" && (
          <div className="col text-end">
            <button className="btn user-history-button" onClick={handleOpenReview}>
              Reseña
            </button>
          </div>
        )}
      </div>
      {isReviewOpen && (
        <ReviewModal
          onClose={handleCloseReview}
          onSubmit={handleSubmitReview}
          professionalImg={props.professionalImg} 
        />
      )}
      {showReviewSummary && reviewData && (
        <ReviewSummaryModal
          reviewData={reviewData}
          onClose={() => setShowReviewSummary(false)}
        />
      )}
    </div>
  );
}

UserHistory.propTypes = {
  servicio: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  professionalImg: PropTypes.string, 
};

export default UserHistory;
