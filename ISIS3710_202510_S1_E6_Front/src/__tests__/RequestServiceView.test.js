import { render, screen } from "@testing-library/react";
import RequestServiceView from "../views/RequestServiceView";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');

describe("RequestServiceView Component", () => {
  test("Renderiza RequestForm con la prop servicios", () => {
    const servicios = [{ id: 1, servicio: "Plomería" }];
    render(
      <MemoryRouter>
        <RequestServiceView servicios={servicios} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Publica tu/i)).toBeInTheDocument();
  });
});
