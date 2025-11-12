import React, { useState } from "react";
import "../styles/FilterPanel.css";
import PropTypes from "prop-types";

export default function FilterPanel({ onApplyFilters, onClose }) {
  const [presupuestoMin, setPresupuestoMin] = useState("");
  const [presupuestoMax, setPresupuestoMax] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters({
      presupuestoMin,
      presupuestoMax,
      fecha,
      tipo,
    });
    onClose();
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3 className="filter-title">Filtrar Solicitudes</h3>
        <button onClick={onClose} className="filter-close-btn">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="filter-label" htmlFor="presupuestoMin">Presupuesto (mín):</label>
          <input
            type="number"
            value={presupuestoMin}
            onChange={(e) => setPresupuestoMin(e.target.value)}
            placeholder="Ej: 50000"
            className="filter-input"
          />
        </div>
        <div>
          <label className="filter-label" htmlFor="presupuestoMax" >Presupuesto (máx):</label>
          <input
            type="number"
            value={presupuestoMax}
            onChange={(e) => setPresupuestoMax(e.target.value)}
            placeholder="Ej: 150000"
            className="filter-input"
          />
        </div>
        <div>
          <label className="filter-label" htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="filter-input"
          />
        </div>
        <div>
          <label className="filter-label" htmlFor="tipoServicios">Tipo de Servicio:</label>
          <input
            type="text"
            placeholder="Ej: Plomería"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="filter-input"
          />
        </div>
        <button type="submit" className="filter-button">
          Aplicar Filtros
        </button>
      </form>
    </div>
  );
}

FilterPanel.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
