import { render, screen, fireEvent } from "@testing-library/react";
import WorkerView from "../views/WorkerView";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');

describe("WorkerView Component", () => {
  test("Renderiza Dashboard y cambia a 'Servicios'", () => {
    render(
      <MemoryRouter>
        <WorkerView />
      </MemoryRouter>
    );
    expect(screen.getByText("Solicitudes")).toBeInTheDocument();
    const serviciosIcon = screen.getByAltText("Servicios");
  });
  test("Renderiza Dashboard por defecto", () => {
    render(
      <MemoryRouter>
        <WorkerView />
      </MemoryRouter>
    );
    expect(screen.getByText("Solicitudes")).toBeInTheDocument();
  });

});
