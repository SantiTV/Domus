import { render, screen, fireEvent } from "@testing-library/react";
import ReviewModal from "../components/ReviewModal";

jest.mock('axios');

describe("ReviewModal Component", () => {
  test("Permite seleccionar una calificación y enviar la reseña", () => {
    const mockOnSubmit = jest.fn();
    const mockOnClose = jest.fn();
    render(<ReviewModal onClose={mockOnClose} onSubmit={mockOnSubmit} professionalImg="/test.png" />);
    const stars = screen.getAllByText("★");
    fireEvent.click(stars[2]);
    const textarea = screen.getByPlaceholderText("Escribe tu reseña...");
    fireEvent.change(textarea, { target: { value: "Excelente servicio" } });
    fireEvent.click(screen.getByText("Calificar"));
    expect(mockOnSubmit).toHaveBeenCalledWith(3, "Excelente servicio");
  });

  test("Llama onClose al hacer clic en 'Cancelar'", () => {
    const mockOnClose = jest.fn();
    render(<ReviewModal onClose={mockOnClose} onSubmit={jest.fn()} professionalImg="/test.png" />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
