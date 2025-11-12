import { fireEvent, render, screen } from "@testing-library/react";
import Forms from "../components/Forms";

jest.mock('axios');

describe("Forms Component", () => {
    test("Renderiza correctamente", () => {
        render(<Forms />);
        expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
        expect(screen.getByText(/Elige cómo quieres ganar dinero/i)).toBeInTheDocument();
    });


    test("Permite subir una fotocopia de cédula", () => {
        render(<Forms />);
        const fileInput = screen.getByLabelText(/Agregue una fotocopia de su cédula/i);

        const file = new File(["dummy content"], "cedula.pdf", { type: "application/pdf" });
        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByText("cedula.pdf")).toBeInTheDocument();
    });

    test("Permite subir una hoja de vida", () => {
        render(<Forms />);
        const resumeInput = screen.getByLabelText(/Hoja de Vida/i);

        const file = new File(["dummy content"], "resume.pdf", { type: "application/pdf" });
        fireEvent.change(resumeInput, { target: { files: [file] } });

        expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    });

    test("Muestra nombre de archivo al subir cédula y hoja de vida", () => {
        render(<Forms />);
        const cedulaInput = screen.getByLabelText(/Agregue una fotocopia de su cédula/i);
        const resumeInput = screen.getByLabelText(/Hoja de Vida/i);
        const file1 = new File(["dummy content"], "cedula.pdf", { type: "application/pdf" });
        const file2 = new File(["dummy content"], "resume.pdf", { type: "application/pdf" });

        fireEvent.change(cedulaInput, { target: { files: [file1] } });
        fireEvent.change(resumeInput, { target: { files: [file2] } });
        expect(screen.getByText("cedula.pdf")).toBeInTheDocument();
        expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    });
});
