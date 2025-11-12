describe("Inicio de sesión y navegación por SidebarLayout", () => {
    it("Inicia sesión, cambia entre pestañas y cierra sesión", () => {
        cy.visit("http://localhost:3001/iniciarSesion");

        // LOGIN
        cy.get('input[type="email"]').type("usuario@ejemplo.com");
        cy.get('input[type="password"]').type("contrasena123");
        cy.get('button[type="submit"]').click();

        // Verifica que el Sidebar cargó
        cy.contains("Perfil").should("exist");

        // CAMBIAR ENTRE PESTAÑAS
        cy.get("button").contains("Ajustes").click().should("have.class", "active");
        cy.get("button").contains("Ayuda").click().should("have.class", "active");
        cy.get("button").contains("Historial").click().should("have.class", "active");


    });
});
