import { render, screen, fireEvent } from "@testing-library/react";
import ReviewSummaryModal from "../components/ReviewSummaryModal";

jest.mock('axios');

describe("ReviewSummaryModal Component", () => {
  test("Muestra correctamente la reseña y las estrellas llenas según la calificación", () => {
    const reviewData = { rating: 4, reviewText: "Muy bueno" };
    const mockOnClose = jest.fn();
    render(<ReviewSummaryModal reviewData={reviewData} onClose={mockOnClose} />);
    const stars = screen.getAllByText("★").filter(star => star.className.includes("filled"));
    expect(stars.length).toBe(4);
    expect(screen.getByText("Muy bueno")).toBeInTheDocument();
  });

  test("Llama onClose al hacer clic en 'Cerrar'", () => {
    const reviewData = { rating: 4, reviewText: "Muy bueno" };
    const mockOnClose = jest.fn();
    render(<ReviewSummaryModal reviewData={reviewData} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
