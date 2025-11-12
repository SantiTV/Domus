import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

jest.mock('axios');

describe("Footer Component - Additional", () => {
  test("Renderiza el Footer y muestra los textos e íconos de redes", () => {
    render(<Footer />);
    expect(screen.getByText(/DomUs/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar/i)).toBeInTheDocument();
    expect(screen.getByText(/Legal/i)).toBeInTheDocument();
    expect(screen.getByAltText("Facebook")).toBeInTheDocument();
    expect(screen.getByAltText("Twitter")).toBeInTheDocument();
    expect(screen.getByAltText("Whatsapp")).toBeInTheDocument();
    expect(screen.getByAltText("Instagram")).toBeInTheDocument();
  });
});
