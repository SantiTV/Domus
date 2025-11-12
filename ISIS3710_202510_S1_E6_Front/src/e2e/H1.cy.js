describe('Formulario de Registro', () => {
    const userData = {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        telefono: '1234567890',
        contraseña: 'mi_contraseña_segura'
    };

    beforeEach(() => {
        cy.visit('http://localhost:3001/registrarse');
    });

    it('Muestra el formulario correctamente', () => {
        cy.contains('Registro');
        cy.get('input[placeholder="Nombre completo"]').should('exist');
        cy.get('input[placeholder="Correo electrónico"]').should('exist');
        cy.get('input[placeholder="Número de teléfono"]').should('exist');
        cy.get('input[placeholder="Contraseña"]').should('exist');
    });

    it('Valida correo electrónico inválido', () => {
        cy.get('input[placeholder="Nombre completo"]').type(userData.nombre);
        cy.get('input[placeholder="Correo electrónico"]').type('correo-invalido');
        cy.get('input[placeholder="Número de teléfono"]').type(userData.telefono);
        cy.get('input[placeholder="Contraseña"]').type(userData.contraseña);

        cy.get('button[type="submit"]').click();


    });

    it('Envía correctamente el formulario con datos válidos', () => {
        cy.intercept('POST', 'http://localhost:3000/api/v1/usuarios', {
            statusCode: 200,
            body: {
                id: 1,
                nombre: userData.nombre,
                correo: userData.correo,
                token: 'fake-token'
            },
        }).as('registroRequest');

        cy.get('input[placeholder="Nombre completo"]').type(userData.nombre);
        cy.get('input[placeholder="Correo electrónico"]').type(userData.correo);
        cy.get('input[placeholder="Número de teléfono"]').type(userData.telefono);
        cy.get('input[placeholder="Contraseña"]').type(userData.contraseña);

        cy.get('button[type="submit"]').click();

        cy.wait('@registroRequest').its('request.body').should((body) => {
            expect(body.nombre).to.eq(userData.nombre);
            expect(body.correo).to.eq(userData.correo);
            expect(body.telefono).to.eq(userData.telefono);
            expect(body.contraseña).to.eq(userData.contraseña);
            expect(body.roles).to.eq("usuario");
        });

        cy.url().should('include', '/pagina-usuario');
    });

    it('Muestra error si la API falla', () => {
        cy.intercept('POST', 'http://localhost:3000/api/v1/usuarios', {
            statusCode: 400,
            body: {
                message: 'Correo ya registrado'
            },
        }).as('registroFallido');

        cy.get('input[placeholder="Nombre completo"]').type(userData.nombre);
        cy.get('input[placeholder="Correo electrónico"]').type(userData.correo);
        cy.get('input[placeholder="Número de teléfono"]').type(userData.telefono);
        cy.get('input[placeholder="Contraseña"]').type(userData.contraseña);

        cy.get('button[type="submit"]').click();

        cy.wait('@registroFallido');
        cy.contains('Correo ya registrado').should('exist');
    });
});
