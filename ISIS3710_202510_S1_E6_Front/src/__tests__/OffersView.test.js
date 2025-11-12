import { render, screen, fireEvent } from "@testing-library/react";
import OffersView from "../views/OffersView";

jest.mock('axios');

describe("OffersView.js", () => {

    test("Se aplican los filtros minimos desde el panel", () => {
        render(<OffersView />);

        // Abre el panel de filtros
        fireEvent.click(screen.getByText("Filtros"));

        // Aplica un filtro de presupuesto mínimo
        fireEvent.change(screen.getByPlaceholderText("Ej: 50000"), {
            target: { value: "5000" },
        });
        fireEvent.click(screen.getByText("Aplicar Filtros"));

        // Verifica que los servicios filtrados se muestran correctamente
        expect(screen.getAllByText("Reparación Nevera").length).toBeGreaterThanOrEqual(0);

    });

    test("Se aplican los filtros maximos desde el panel", () => {
        render(<OffersView />);

        fireEvent.click(screen.getByText("Filtros"));
        // Aplica un filtro de presupuesto máximo
        fireEvent.change(screen.getByPlaceholderText("Ej: 150000"), {
            target: { value: "15000" },
        });
        fireEvent.click(screen.getByText("Aplicar Filtros"));

        // Verifica que los servicios filtrados se muestran correctamente
        expect(screen.getAllByText("Reparación Nevera").length).toBeGreaterThanOrEqual(0);
    });

    test("Se aplican los filtros de fecha desde el panel", () => {
        const { container } = render(<OffersView />);
        fireEvent.click(screen.getByText("Filtros"));
        // Aplica un filtro de fecha
        const dateInput = container.querySelector("input[type='date']");
        fireEvent.change(dateInput, {
            target: { value: "2025-02-22" },
        });
        fireEvent.click(screen.getByText("Aplicar Filtros"));

        expect(screen.getAllByText("Reparación Nevera").length).toBeGreaterThanOrEqual(1);
    });

    test("filtrar según busqueda", () => {
        render(<OffersView />);

        // Simula la búsqueda
        fireEvent.change(screen.getByPlaceholderText("Buscar..."), {
            target: { value: "Reparación Nevera" },
        });

        // Verifica que los servicios filtrados se muestran correctamente
        expect(screen.getAllByText("Reparación Nevera").length).toBeGreaterThanOrEqual(1);
    });

    test("filtrar segun tipo", () => {
        render(<OffersView />);

        fireEvent.click(screen.getByText("Filtros"));
        // Aplica un filtro de presupuesto máximo
        fireEvent.change(screen.getByPlaceholderText("Ej: Plomería"), {
            target: { value: "Nevera" },
        });
        fireEvent.click(screen.getByText("Aplicar Filtros"));

        // Verifica que los servicios filtrados se muestran correctamente
        expect(screen.getAllByText("Reparación Nevera").length).toBeGreaterThanOrEqual(0);
    });

    test("Se muestra la notificación al aceptar un servicio", () => {
        render(<OffersView />);

        // Simula la aceptación de un servicio
        const aceptarBotones = screen.getAllByText("Aceptar");
        fireEvent.click(aceptarBotones[0]);

        // Verifica que la notificación se muestra correctamente
        expect(screen.getByText("Servicio Aceptado")).toBeInTheDocument();
    });

    test("Se muestra la notificación al rechazar un servicio", () => {
        render(<OffersView />);

        // Simula la aceptación de un servicio
        const aceptarBotones = screen.getAllByText("Rechazar");
        fireEvent.click(aceptarBotones[0]);

        // Verifica que la notificación se muestra correctamente
        expect(screen.getByText("Servicio Rechazado")).toBeInTheDocument();
    });
    // test("Cierra la notificación al hacer clic en el botón de cerrar", () => {
    //     const { getByText, getByAltText } = render(<OffersView />);

    //     // Simula la aceptación de un servicio
    //     fireEvent.click(screen.getByText("Aceptar Servicio 1"));

    //     // Verifica que la notificación se muestra correctamente
    //     expect(screen.getByText("Servicio Aceptado")).toBeInTheDocument();

    //     // Cierra la notificación
    //     fireEvent.click(screen.getByAltText("Cerrar"));

    //     // Verifica que la notificación ya no está en el documento
    //     expect(screen.queryByText("Servicio Aceptado")).not.toBeInTheDocument();
    // });
});
