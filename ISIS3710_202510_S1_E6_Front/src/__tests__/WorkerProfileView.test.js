import { render, screen } from "@testing-library/react";
import WorkerProfileView from "../views/WorkerProfileView";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');

test("renderizar la vista de perfil del trabajador", () => {
    render(
        <MemoryRouter>
            <WorkerProfileView />
        </MemoryRouter>
    );

    // Verifica que el componente Navbar se renderiza correctamente
    const navbar = screen.getByText("Dom");
    expect(navbar).toBeInTheDocument();
});
test("Renderiza el Navbar", () => {
    render(<MemoryRouter>
        <WorkerProfileView />
    </MemoryRouter>);
    expect(screen.getByText(/Dom/i)).toBeInTheDocument();
    expect(screen.getByAltText("Usuario")).toBeInTheDocument();
});