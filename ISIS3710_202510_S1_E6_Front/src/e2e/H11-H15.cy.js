describe('Flujo usuario: login, Domus y solicitud de servicio (sin archivo)', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('carlos@example.com');
    cy.get('input[type="password"]').type('1234');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');
  });

  it('Navega a Domus, rellena el formulario y envía solicitud sin archivo', () => {
    cy.get('p.logo').click();

    // Click en "Buscar Profesional"
    cy.get('button.boton-pide-un-experto').click();

    // Asegúrate que estamos en /solicitarServicio
    cy.url().should('include', '/solicitarServicio');

    // Selecciona un tipo de servicio (primer opción válida)
    cy.get('select#tipoServicio').then(($select) => {
      cy.wrap($select).find('option').its('length').should('be.gte', 2);
      cy.wrap($select).select($select.find('option').eq(1).val());
    });

    // Escribir descripción
    cy.get('textarea#descripcion').type('Necesito un servicio rápido y eficiente.');

    // No subir archivo

    // Ingresar ubicación
    cy.get('input#direccion').type('Av. Siempre Viva 742');

    // Escribir fecha directamente en el input
    cy.get('input[placeholder="MM/DD/YYYY"]').clear().type('05/25/2025');

    // Escribir hora directamente en el input
    cy.get('input[placeholder="hh:mm aa"]').clear().type('10:00 AM');

    // Enviar formulario
    cy.get('button.botonPublicar').click();

    // Esperar alerta
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Solicitud publicada y agendada con éxito');
    });
  });
});
