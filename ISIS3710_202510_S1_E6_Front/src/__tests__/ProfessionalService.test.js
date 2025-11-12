import { render, screen, fireEvent } from "@testing-library/react";
import ProfessionalService from "../components/ProfessionalService";
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock('axios');

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProfessionalService Component", () => {
  test("Renderiza correctamente textos y botones", () => {
    render(
      <MemoryRouter>
        <ProfessionalService servicios={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Profesionales A Un/i)).toBeInTheDocument();
    expect(screen.getByText("Pide Un Experto")).toBeInTheDocument();
  });
  describe("Pruebas adicionales", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
      useNavigate.mockReturnValue(mockNavigate);
      jest.clearAllMocks();
    });

    test("Renderiza la imagen con alt 'Profesional'", () => {
      render(
        <MemoryRouter>
          <ProfessionalService servicios={[]} />
        </MemoryRouter>
      );
      expect(screen.getByAltText("Profesional")).toBeInTheDocument();
    });

    test("Renderiza el formulario y sus campos", () => {
      render(
        <MemoryRouter>
          <ProfessionalService servicios={[]} />
        </MemoryRouter>
      );
      expect(screen.getByPlaceholderText("Ingrese su Ubicación")).toBeInTheDocument();
      expect(screen.getByText("Seleccione El Tipo De Servicio")).toBeInTheDocument();
    });

    test("Navega a '/solicitarServicio' al hacer clic en 'Buscar Profesional'", () => {
      render(
        <MemoryRouter>
          <ProfessionalService servicios={[]} />
        </MemoryRouter>
      );
      const searchButton = screen.getByText("Buscar Profesional");
      fireEvent.click(searchButton);
      expect(mockNavigate).toHaveBeenCalledWith("/solicitarServicio");
    });
  });
});
