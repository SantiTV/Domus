import { render, screen, fireEvent } from "@testing-library/react";
import Notification from "../components/Notification";

jest.mock('axios');

describe("Notification Component - New", () => {
  test("No renderiza si no hay mensaje", () => {
    const { container } = render(<Notification onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  test("Renderiza sin imagenes si no se proporcionan profileImage ni bellIcon", () => {
    render(
      <Notification
        title="Test Title"
        message="Test message"
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.queryByAltText("Profile")).toBeNull();
    expect(screen.queryByAltText("Bell")).toBeNull();
  });

  test("Cierra notificación al hacer clic en el botón de cerrar", () => {
    const mockOnClose = jest.fn();
    render(
      <Notification
        title="Test Title"
        message="Test message"
        profileImage="/profile.png"
        bellIcon="/bell.png"
        onClose={mockOnClose}
      />
    );
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
