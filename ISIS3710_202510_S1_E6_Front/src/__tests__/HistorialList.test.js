import { render, screen } from "@testing-library/react";
import HistorialList from "../components/HistorialList";

jest.mock('axios');

describe("HistorialList Component - New", () => {
  test("Renderiza múltiples historiales", () => {
    const userHistory = [
      { servicio: "Servicio 1", status: "Completado", date: "2025-01-01", time: "10:00", price: 100 },
      { servicio: "Servicio 2", status: "En Proceso", date: "2025-01-02", time: "11:00", price: 200 },
      { servicio: "Servicio 3", status: "Cancelado", date: "2025-01-03", time: "12:00", price: 300 }
    ];
    render(<HistorialList userHistory={userHistory} />);
    expect(screen.getByText("¡Mis Servicios Solicitados!")).toBeInTheDocument();
  });
});
