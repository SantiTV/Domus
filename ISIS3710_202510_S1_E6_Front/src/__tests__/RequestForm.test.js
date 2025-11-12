import { render, screen } from "@testing-library/react";
import RequestForm from "../components/RequestForm";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');

describe("RequestForm Component", () => {
  test("Renderiza el formulario de solicitud y el mapa", () => {
    render(
      <MemoryRouter>
        <RequestForm servicios={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Publica tu/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descripción")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese su ubicación/i)).toBeInTheDocument();
    expect(document.querySelector(".mapaContenedor")).toBeInTheDocument();
  });
});
