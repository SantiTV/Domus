import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from "../components/Navbar";
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("Navbar Component - New", () => {
  const dummySetSelectedView = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    dummySetSelectedView.mockClear();
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("Renderiza logo, íconos de navegación y avatar", () => {
    render(
      <MemoryRouter>
        <Navbar setSelectedView={dummySetSelectedView} />
      </MemoryRouter>
    );
    // Verifica que aparezca el logo
    expect(screen.getByText(/Dom/i)).toBeInTheDocument();
    // Verifica que se rendericen los íconos de cada opción
    const navItems = ["Dashboard", "Servicios", "Mensajes", "Calendario", "Perfil"];
    navItems.forEach(item => {
      expect(screen.getByAltText(item)).toBeInTheDocument();
    });
    // Verifica el avatar
    expect(screen.getByAltText("Usuario")).toBeInTheDocument();
  });

  test("Cambia vista al hacer clic en un ícono", () => {
    render(
      <MemoryRouter>
        <Navbar setSelectedView={dummySetSelectedView} />
      </MemoryRouter>
    );
    // Simula clic en el ícono de "Dashboard"
    const dashboardLink = screen.getByAltText("Dashboard").closest("a");
    fireEvent.click(dashboardLink);
    expect(dummySetSelectedView).toHaveBeenCalledWith("Dashboard");
  });
});
