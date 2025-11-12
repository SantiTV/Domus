import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Dashboard from "./components/ProfesionalMap";
import WorkerView from "./views/WorkerView";
import Navbar from './components/Navbar';
import UserHistory from './components/UserHistory'
import SidebarLayout from './components/SidebarLayout';
import FilterPanel from './components/FilterPanel';
import Forms from './components/Forms';
import Notification from './components/Notification';
import OfferCard from './components/OfferCard';
import Register from './components/Register';
import { MemoryRouter } from 'react-router-dom';

const mockServiceData = [
  {
    idServicio: 1,
    role: "Cliente",
    service: "Plomería",
    description: "Reparación de tuberías",
    image: "/assets/plumbing.png",
    scheduledDate: "2025-03-20T10:00:00",
    address: "Calle 123, Bogotá",
    clientImg: "/assets/client1.png",
    client: "Juan Pérez",
    price: 50000,
    lat: 4.60971,
    lng: -74.08175,
  },
  {
    idServicio: 2,
    role: "Cliente",
    service: "Electricidad",
    description: "Instalación de enchufes",
    image: "/assets/electricity.png",
    scheduledDate: "2025-03-22T14:00:00",
    address: "Carrera 45, Medellín",
    clientImg: "/assets/client2.png",
    client: "Ana Gómez",
    price: 70000,
    lat: 6.2476,
    lng: -75.5658,
  },
];

test('renderiza el footer y los iconos de redes sociales', () => {
  render(<App />);

  // Verifica que el footer esté presente
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();

  // Verifica los íconos de redes sociales por su atributo "alt"
  const facebookIcon = screen.getByAltText('Facebook');
  const twitterIcon = screen.getByAltText('Twitter');
  const whatsappIcon = screen.getByAltText('Whatsapp');
  const instagramIcon = screen.getByAltText('Instagram');

  expect(facebookIcon).toBeInTheDocument();
  expect(twitterIcon).toBeInTheDocument();
  expect(whatsappIcon).toBeInTheDocument();
  expect(instagramIcon).toBeInTheDocument();
});



describe("WorkerView Component", () => {
  test("Muestra el Dashboard por defecto", () => {
    render(<MemoryRouter>
      <WorkerView />
    </MemoryRouter>);

    // Verifica que se muestre el título del Dashboard
    expect(screen.getByText("Solicitudes")).toBeInTheDocument();
  });
});

describe('Navbar Component', () => {
  test('renderiza el logo, los íconos de navegación y el avatar', () => {
    const dummySetSelectedView = jest.fn();
    render(<MemoryRouter>
      <Navbar setSelectedView={dummySetSelectedView} />
    </MemoryRouter>);

    // Verifica que se muestre el logo "DomUS"
    expect(screen.getByText(/Dom/i)).toBeInTheDocument();
    expect(screen.getByText(/US/i)).toBeInTheDocument();

    // Verifica que cada ícono de navegación está presente (usando su atributo alt)
    const navItems = [
      "Dashboard",
      "Servicios",
      "Mensajes",
      "Calendario",
      "Perfil",
    ];
    navItems.forEach((item) => {
      expect(screen.getByAltText(item)).toBeInTheDocument();
    });

    // Verifica que el avatar se renderiza con alt "Usuario"
    expect(screen.getByAltText("Usuario")).toBeInTheDocument();
  });

  test('al hacer clic en un ícono, llama a setSelectedView con el nombre correcto', () => {
    const dummySetSelectedView = jest.fn();
    render(<MemoryRouter>
      <Navbar setSelectedView={dummySetSelectedView} />
    </MemoryRouter>);

    // Selecciona el ícono de "Servicios" mediante su alt text
    const serviciosIcon = screen.getByAltText("Servicios");
    // Simula el clic en el enlace que lo contiene
    fireEvent.click(serviciosIcon.closest('a'));

    expect(dummySetSelectedView).toHaveBeenCalledWith("Servicios");
  });
});

// Mock de ReviewModal: se renderiza un div con testid="review-modal"
jest.mock('./components/ReviewModal', () => {
  return function DummyReviewModal(props) {
    return <div data-testid="review-modal">Review Modal</div>;
  };
});

// Mock de ReviewSummaryModal: se renderiza un div con testid="review-summary-modal"
jest.mock('./components/ReviewSummaryModal', () => {
  return function DummyReviewSummaryModal(props) {
    return <div data-testid="review-summary-modal">Review Summary Modal</div>;
  };
});

describe('UserHistory Component', () => {
  const defaultProps = {
    servicio: "Reparación de nevera",
    status: "Completado",
    date: "2025-02-22",
    time: "15:30",
    price: 120000,
    professionalImg: "/assets/profesional.png"
  };

  test('renderiza correctamente la información', () => {
    render(<UserHistory {...defaultProps} />);

    // Verifica que se muestre el título, status, fecha, hora y precio
    expect(screen.getByText("Reparación de nevera")).toBeInTheDocument();
    expect(screen.getByText("Completado")).toBeInTheDocument();
    expect(screen.getByText(/Fecha:/i)).toBeInTheDocument();
    expect(screen.getByText(/Hora:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$120000/)).toBeInTheDocument();
  });

  test('al hacer clic en "Resumen" muestra alerta cuando no hay reseña', () => {
    // Simulamos el alert
    window.alert = jest.fn();

    render(<UserHistory {...defaultProps} />);

    // Se obtiene el botón "Resumen" por su texto
    const resumenButton = screen.getByText("Resumen");
    fireEvent.click(resumenButton);

    expect(window.alert).toHaveBeenCalledWith("No hay reseña disponible.");
  });

  test('al hacer clic en "Reseña" se abre el ReviewModal cuando el status es "Completado"', () => {
    render(<UserHistory {...defaultProps} />);

    // Al status "Completado" se muestra el botón "Reseña"
    const resenaButton = screen.getByText("Reseña");
    fireEvent.click(resenaButton);

    // Verificamos que se renderiza el ReviewModal
    expect(screen.getByTestId("review-modal")).toBeInTheDocument();
  });
});


describe("UserHistory", () => {
  const defaultProps = {
    servicio: "Reparación de nevera",
    status: "Completado",
    date: "2025-02-22",
    time: "15:30",
    price: 120000,
    professionalImg: "/assets/profesional.png",
  };

  test('renderiza correctamente la información y los botones cuando el status es "Completado"', () => {
    render(<UserHistory {...defaultProps} />);

    // Verifica que se muestre el título del servicio
    expect(screen.getByText("Reparación de nevera")).toBeInTheDocument();
    // Verifica que se muestre el status
    expect(screen.getByText("Completado")).toBeInTheDocument();
    // Verifica que se muestren Fecha, Hora y Precio
    expect(screen.getByText(/Fecha:/i)).toBeInTheDocument();
    expect(screen.getByText("2025-02-22")).toBeInTheDocument();
    expect(screen.getByText(/Hora:/i)).toBeInTheDocument();
    expect(screen.getByText("15:30")).toBeInTheDocument();
    expect(screen.getByText(/\$120000/i)).toBeInTheDocument();

    // Se esperan dos botones: "Resumen" y "Reseña"
    expect(screen.getByRole("button", { name: "Resumen" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reseña" })).toBeInTheDocument();
  });

  test('no renderiza el botón "Reseña" cuando el status no es "Completado"', () => {
    const props = { ...defaultProps, status: "En Proceso" };
    render(<UserHistory {...props} />);

    // El botón "Resumen" siempre se muestra
    expect(screen.getByRole("button", { name: "Resumen" })).toBeInTheDocument();
    // Cuando el status no es "Completado", no se muestra el botón "Reseña"
    expect(screen.queryByRole("button", { name: "Reseña" })).toBeNull();
  });

  test('al hacer clic en "Resumen" muestra alerta si no hay reseña disponible', () => {
    // Simula el alert para evitar ventanas emergentes en los tests
    window.alert = jest.fn();
    render(<UserHistory {...defaultProps} />);

    const resumenButton = screen.getByRole("button", { name: "Resumen" });
    fireEvent.click(resumenButton);

    expect(window.alert).toHaveBeenCalledWith("No hay reseña disponible.");
  });
});


describe('SidebarLayout Component', () => {
  // Creamos datos de ejemplo para userHistory
  const userHistoryMock = [
    {
      servicio: '¡Mis Servicios Solicitados!',
      status: 'En Proceso',
      date: '2025-01-01',
      time: '10:00',
      price: 100,
    },
  ];


});

describe("FilterPanel Component", () => {
  const mockOnApplyFilters = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza correctamente el título, inputs y botón", () => {
    render(<FilterPanel onApplyFilters={mockOnApplyFilters} onClose={mockOnClose} />);

    // Verifica que se muestre el título
    expect(screen.getByText(/Filtrar Solicitudes/i)).toBeInTheDocument();

    // Verifica que se rendericen los inputs con sus placeholders
    expect(screen.getByPlaceholderText(/Ej: 50000/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: 150000/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: Plomería/i)).toBeInTheDocument();

    // Verifica que se renderice el botón "Aplicar Filtros"
    expect(screen.getByRole("button", { name: /Aplicar Filtros/i })).toBeInTheDocument();
  });

  test("llama a onApplyFilters y onClose al enviar el formulario", () => {
    render(<FilterPanel onApplyFilters={mockOnApplyFilters} onClose={mockOnClose} />);

    // Obtiene los inputs mediante sus placeholders
    const minInput = screen.getByPlaceholderText("Ej: 50000");
    const maxInput = screen.getByPlaceholderText("Ej: 150000");
    const tipoInput = screen.getByPlaceholderText("Ej: Plomería");

    // Para el input de fecha, usamos querySelector ya que no tiene placeholder
    const fechaInput = document.querySelector("input[type='date']");

    // Simula cambios en los inputs
    fireEvent.change(minInput, { target: { value: "50000" } });
    fireEvent.change(maxInput, { target: { value: "150000" } });
    fireEvent.change(fechaInput, { target: { value: "2025-03-01" } });
    fireEvent.change(tipoInput, { target: { value: "Plomería" } });

    // Simula enviar el formulario haciendo clic en el botón "Aplicar Filtros"
    const submitButton = screen.getByRole("button", { name: /Aplicar Filtros/i });
    fireEvent.click(submitButton);

    // Verifica que onApplyFilters se llame con los valores correctos
    expect(mockOnApplyFilters).toHaveBeenCalledWith({
      presupuestoMin: "50000",
      presupuestoMax: "150000",
      fecha: "2025-03-01",
      tipo: "Plomería",
    });
    // Verifica que onClose se haya llamado
    expect(mockOnClose).toHaveBeenCalled();
  });
});


describe('Forms Component', () => {
  test('renderiza el mensaje de bienvenida y los botones de trabajos', () => {
    render(<Forms />);

    // Verifica que se muestra el mensaje de bienvenida y la invitación a elegir trabajos
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
    expect(screen.getByText(/Elige cómo quieres ganar dinero/i)).toBeInTheDocument();

  });

  test('renderiza las etiquetas de archivos y el botón "Términos y Condiciones"', () => {
    render(<Forms />);

    // Verifica que se muestran las etiquetas para cédula y hoja de vida
    expect(screen.getByText(/Agregue una fotocopia de su cédula/i)).toBeInTheDocument();
    expect(screen.getByText(/Hoja de Vida/i)).toBeInTheDocument();

    // Verifica que se renderiza el botón "Términos y Condiciones"
    expect(screen.getByRole('button', { name: /Términos y Condiciones/i })).toBeInTheDocument();
  });
});


describe("Notification Component", () => {
  test("no renderiza nada si no hay mensaje", () => {
    const { container } = render(<Notification onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  test("renderiza correctamente el título, mensaje y las imágenes", () => {
    render(
      <Notification
        title="Servicio Aceptado"
        message="Has aceptado el servicio."
        profileImage="/profile.png"
        bellIcon="/bell.png"
        onClose={jest.fn()}
      />
    );

    // Verifica que el título se muestra
    expect(screen.getByText("Servicio Aceptado")).toBeInTheDocument();
    // Verifica que el mensaje se muestra
    expect(screen.getByText("Has aceptado el servicio.")).toBeInTheDocument();
    // Verifica que la imagen de perfil se muestra
    expect(screen.getByAltText("Profile")).toBeInTheDocument();
    // Verifica que la imagen de campana se muestra
    expect(screen.getByAltText("Bell")).toBeInTheDocument();
  });

  test("llama a onClose al hacer clic en el botón de cerrar", () => {
    const mockOnClose = jest.fn();
    render(
      <MemoryRouter>
        <Notification
          title="Servicio Aceptado"
          message="Has aceptado el servicio."
          onClose={mockOnClose}
        />
      </MemoryRouter>
    );

    // Busca el botón de cerrar (el que contiene "&times;")
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});

describe("OfferCard", () => {
  const dummyProps = {
    idServicio: "1",
    role: "Administrador",
    service: "Servicio de Prueba",
    description: "Descripción de prueba",
    image: "test-image.jpg",
    scheduledDate: "2025-03-17",
    address: "Calle Falsa 123",
    clientImg: "client-image.jpg",
    client: "Cliente de Prueba",
    onAccept: jest.fn(),
    onReject: jest.fn(),
  };

  test("se renderiza correctamente con los props", () => {
    render(<OfferCard {...dummyProps} />);
    expect(screen.getByText("Administrador")).toBeInTheDocument();
    expect(screen.getByText("Servicio de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Cliente de Prueba")).toBeInTheDocument();
  });

  test("llama a onAccept con el idServicio cuando se hace clic en Aceptar", () => {
    render(<OfferCard {...dummyProps} />);
    const acceptButton = screen.getByText("Aceptar");
    fireEvent.click(acceptButton);
    expect(dummyProps.onAccept).toHaveBeenCalledWith(dummyProps.idServicio);
  });

  test("llama a onReject con el idServicio cuando se hace clic en Rechazar", () => {
    render(<OfferCard {...dummyProps} />);
    const rejectButton = screen.getByText("Rechazar");
    fireEvent.click(rejectButton);
    expect(dummyProps.onReject).toHaveBeenCalledWith(dummyProps.idServicio);
  });
});

test("Renderiza el componente Register sin errores", () => {
  render(<MemoryRouter>
    <Register />
  </MemoryRouter>);
  // Verifica que el título "Registro" se muestre
  expect(screen.getByText("Registro")).toBeInTheDocument();
});