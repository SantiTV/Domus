import React from "react";
import "../styles/ReviewSummaryModal.css";
import PropTypes from "prop-types";

const ReviewSummaryModal = ({ reviewData, onClose }) => {
  return (
    <div className="review-summary-overlay">
      <div className="review-summary-modal">
        <button className="review-summary-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="review-summary-title">Resumen de tu reseña</h2>
        <div className="review-summary-rating">
          <span>Calificación: </span>
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            return (
              <span
                key={starValue}
                className={`star ${starValue <= reviewData.rating ? "filled" : ""}`}
              >
                ★
              </span>
            );
          })}
        </div>
        <div className="review-summary-text">
          <p>{reviewData.reviewText}</p>
        </div>
        <button className="btn review-summary-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

ReviewSummaryModal.propTypes = {
  reviewData: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    reviewText: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewSummaryModal;
