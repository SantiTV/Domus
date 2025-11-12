import { render, screen, fireEvent } from "@testing-library/react";
import Auth from "../components/Auth";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');

describe("Auth Component", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renderiza correctamente los inputs y botones", () => {
    render(
      <MemoryRouter>
        <Auth onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Ingrese su correo electrónico")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión con Google")).toBeInTheDocument();
  });

  test("Cambia valor de email y contraseña", () => {
    render(
      <MemoryRouter>
        <Auth onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Ingrese su correo electrónico");
    const passwordInput = screen.getByPlaceholderText("********");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });

    expect(emailInput.value).toBe("user@example.com");
    expect(passwordInput.value).toBe("mypassword");
  });

  test("Activa y desactiva el checkbox 'Recordarme'", () => {
    render(
      <MemoryRouter>
        <Auth onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole("checkbox", { name: /Recordarme/i });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("Existe el link 'Olvidé mi contraseña' que apunta a /recuperar", () => {
    render(
      <MemoryRouter>
        <Auth onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    const forgotLink = screen.getByText(/Olvidé mi contraseña/i);
    expect(forgotLink).toHaveAttribute("href", "/recuperar");
  });
});
