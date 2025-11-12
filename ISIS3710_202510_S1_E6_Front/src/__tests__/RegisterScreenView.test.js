import { render, screen } from "@testing-library/react";
import RegisterScreenView from "../views/RegisterScreenView";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');


describe("RegisterScreenView Component", () => {
  test("Renderiza el componente Register", () => {
    render(<MemoryRouter>
      <RegisterScreenView />;
    </MemoryRouter>)
    expect(screen.getByText("Registro")).toBeInTheDocument();
  });
});
