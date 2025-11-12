import { render } from "@testing-library/react";
import Mapa from "../components/Mapa";

jest.mock('axios');

describe("Mapa Component", () => {
  test("Renderiza el contenedor con dimensiones proporcionadas", () => {
    const { container } = render(<Mapa ancho="400px" altura="300px" />);
    const div = container.querySelector("div");
    expect(div).toHaveStyle({ width: "400px", height: "300px" });
  });
});
