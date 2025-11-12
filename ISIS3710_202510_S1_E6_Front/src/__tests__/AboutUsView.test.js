import { render, screen } from "@testing-library/react";
import AboutUsView from "../views/AboutUsView";

jest.mock('axios');

describe("AboutUsView Component", () => {
  test("Renderiza AboutUs correctamente", () => {
    render(<AboutUsView />);
    expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
  });
});
