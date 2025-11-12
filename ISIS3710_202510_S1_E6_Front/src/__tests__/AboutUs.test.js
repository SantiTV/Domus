import { render, screen } from "@testing-library/react";
import AboutUs from "../components/AboutUs";

jest.mock('axios');

describe("AboutUs Component", () => {

  test("Renderiza secciones de beneficios con sus títulos y textos", () => {
    render(<AboutUs />);
    expect(screen.getByText("Conexión Rápida")).toBeInTheDocument();
    expect(screen.getByText("Servicios Garantizados")).toBeInTheDocument();
    expect(screen.getByText("Seguridad y Confianza")).toBeInTheDocument();
  });
});
