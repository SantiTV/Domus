import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "../components/ServiceCard";

jest.mock('axios');

describe("ServiceCard Component - New Tests", () => {
  const dummyProps = {
    idServicio: 123,
    role: "Tester",
    service: "Test Service",
    description: "Test Description",
    image: "test-image.jpg",
    scheduledDate: "2025-01-01T12:00:00",
    address: "123 Test Street",
    clientImg: "client-test.jpg",
    client: "Test Client",
    onAccept: jest.fn(),
    onReject: jest.fn(),
  };

  test("Llama onAccept con idServicio al hacer clic en 'Aceptar'", () => {
    render(<ServiceCard {...dummyProps} />);
    const acceptButton = screen.getByText("Aceptar");
    fireEvent.click(acceptButton);
    expect(dummyProps.onAccept).toHaveBeenCalledWith(dummyProps.idServicio);
  });

  test("Llama onReject con idServicio al hacer clic en 'Rechazar'", () => {
    render(<ServiceCard {...dummyProps} />);
    const rejectButton = screen.getByText("Rechazar");
    fireEvent.click(rejectButton);
    expect(dummyProps.onReject).toHaveBeenCalledWith(dummyProps.idServicio);
  });

  test("No arroja error si no se pasan las funciones onAccept ni onReject", () => {
    const propsSinCallbacks = { ...dummyProps, onAccept: undefined, onReject: undefined };
    render(<ServiceCard {...propsSinCallbacks} />);
    fireEvent.click(screen.getByText("Aceptar"));
    fireEvent.click(screen.getByText("Rechazar"));
  });
});
