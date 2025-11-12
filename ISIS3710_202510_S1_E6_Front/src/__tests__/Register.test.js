import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../components/Register";

jest.mock('axios');

describe("Register Component", () => {
    test("Renderiza correctamente los campos del formulario", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Verifica que los campos están en el DOM
        expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Número de teléfono")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();

        // Verifica que los botones existen
        expect(screen.getByText("Registrarse")).toBeInTheDocument();
        expect(screen.getByText("Registrarse con Google")).toBeInTheDocument();
    });

    test("Muestra errores cuando se ingresan datos inválidos", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Intenta enviar el formulario con datos incorrectos
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), { target: { value: "correo_invalido" } });
        fireEvent.change(screen.getByPlaceholderText("Número de teléfono"), { target: { value: "12345" } });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "1234" } });

        fireEvent.click(screen.getByText("Registrarse"));

        // Verifica que los mensajes de error aparecen
        expect(screen.getByText("Correo no válido")).toBeInTheDocument();
    });

    test("No muestra errores cuando los datos son válidos", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Ingresar datos válidos
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Número de teléfono"), { target: { value: "+57123456789" } });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "Password123!" } });

        fireEvent.click(screen.getByText("Registrarse"));

        // Verifica que los errores no aparecen
        expect(screen.queryByText("Correo no válido")).not.toBeInTheDocument();
        expect(screen.queryByText("Teléfono debe tener 10 dígitos y comenzar con +57")).not.toBeInTheDocument();
        expect(screen.queryByText("Contraseña debe tener al menos 8 caracteres, un número, una letra y un carácter especial")).not.toBeInTheDocument();
    });
});
