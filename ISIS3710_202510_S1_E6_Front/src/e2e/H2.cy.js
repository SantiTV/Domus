describe("Formulario de inicio de sesión", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/iniciarSesion");
    });

    it("Muestra errores si los campos están vacíos", () => {
        cy.get("button[type='submit']").click();
        cy.get(".invalid-feedback").should("contain", "El correo es requerido");
        cy.get(".invalid-feedback").should("contain", "La contraseña es requerida");
    });

    it("Muestra error si las credenciales son incorrectas", () => {
        cy.intercept("POST", "http://localhost:3000/api/v1/auth/login", {
            statusCode: 401,
            body: {
                message: "Credenciales inválidas",
            },
        }).as("loginRequest");

        cy.get("input[type='email']").type("usuario@ejemplo.com");
        cy.get("input[type='password']").type("claveincorrecta");
        cy.get("button[type='submit']").click();

        cy.wait("@loginRequest");
        cy.get(".alert-danger").should("contain", "Credenciales inválidas");
    });

    it("Permite iniciar sesión exitosamente y redirige", () => {
        cy.intercept("POST", "http://localhost:3000/api/v1/auth/login", {
            statusCode: 200,
            body: {
                access_token: "faketoken123",
            },
        }).as("loginRequest");

        cy.intercept("GET", "http://localhost:3000/api/v1/usuarios/perfil", {
            statusCode: 200,
            body: {
                nombre: "Usuario Prueba",
                correo: "usuario@ejemplo.com",
                rol: "admin",
            },
        }).as("perfilRequest");

        cy.get("input[type='email']").type("usuario@ejemplo.com");
        cy.get("input[type='password']").type("clave12345");
        cy.get("input[type='checkbox']").check(); // marcar "Recordarme"
        cy.get("button[type='submit']").click();

        cy.wait("@loginRequest");
        cy.wait("@perfilRequest");

        cy.url().should("include", "/pagina-usuario");
        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem("loggedUser"));
            expect(user).to.have.property("correo", "usuario@ejemplo.com");
            expect(user).to.have.property("token", "faketoken123");
        });
    });
});
