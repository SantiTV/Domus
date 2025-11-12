import React, { useState } from "react";
import "../styles/ReviewModal.css";
import PropTypes from "prop-types";

function ReviewModal({ onClose, onSubmit, professionalImg }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit(rating, reviewText);
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-content">
        <button className="review-modal-close" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>

        <div className="review-modal-header">
          {professionalImg && (
            <img
              src={professionalImg}
              alt="Profesional"
              className="review-professional-img"
            />
          )}
          <h2 className="review-modal-title">Califica a este profesional</h2>
        </div>

        <div className="review-stars">
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            return (
              <button
                key={starValue}
                type="button"
                className={`star ${starValue <= rating ? "filled" : ""}`}
                onClick={() => handleStarClick(starValue)}
                aria-label={`Calificar con ${starValue} estrella${starValue > 1 ? "s" : ""}`}
              >
                ★
              </button>
            );
          })}
        </div>

        <textarea
          className="review-textarea"
          placeholder="Escribe tu reseña..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="review-buttons">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Calificar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

ReviewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  professionalImg: PropTypes.string,
};

export default ReviewModal;
