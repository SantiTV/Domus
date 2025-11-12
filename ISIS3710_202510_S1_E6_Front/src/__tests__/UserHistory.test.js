import { render, screen, fireEvent } from "@testing-library/react";
import UserHistory from "../components/UserHistory";

jest.mock('axios');

describe("UserHistory Component - New Review Flow", () => {
  const defaultProps = {
    servicio: "Reparación de nevera",
    status: "Completado",
    date: "2025-02-22",
    time: "15:30",
    price: 120000,
    professionalImg: null,
  };

  test("Abre modal de reseña al hacer clic en 'Reseña'", () => {
    render(<UserHistory {...defaultProps} />);
    const resenaButton = screen.getByText("Reseña");
    fireEvent.click(resenaButton);
    expect(screen.getByText(/Califica a este profesional/i)).toBeInTheDocument();
  });

  test("Muestra alerta al hacer clic en 'Resumen' sin reseña previa", () => {
    window.alert = jest.fn();
    render(<UserHistory {...defaultProps} />);
    const resumenButton = screen.getByText("Resumen");
    fireEvent.click(resumenButton);
    expect(window.alert).toHaveBeenCalledWith("No hay reseña disponible.");
  });
});
