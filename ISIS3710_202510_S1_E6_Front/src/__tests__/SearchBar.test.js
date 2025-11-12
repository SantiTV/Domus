import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock('axios');

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SearchBar Component", () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();
  const ciudades = [
    { idUbicacion: 1, ubicacion: "Bogotá" },
    { idUbicacion: 2, ubicacion: "Medellín" },
  ];
  const servicios = [
    { idServicio: 1, servicio: "Plomería" },
    { idServicio: 2, servicio: "Electricidad" },
  ];

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("Muestra botón 'Cerrar Sesión' y nombre de usuario cuando hay user", () => {
    render(
      <MemoryRouter>
        <SearchBar
          ciudades={ciudades}
          servicios={servicios}
          user={{ name: "Carlos" }}
          setUser={mockSetUser}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
  });

  test("Al hacer clic en el logo navega a la página de inicio", () => {
    render(
      <MemoryRouter>
        <SearchBar ciudades={ciudades} servicios={servicios} user={null} setUser={mockSetUser} />
      </MemoryRouter>
    );
    const logoButton = screen.getByText(/Dom/i);
    fireEvent.click(logoButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

});
