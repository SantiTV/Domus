describe('Flujo usuario completo: login, Domus, solicitud sin archivo, logout y luego flujo trabajador login y Hora de Trabajar', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('carlos@example.com');
    cy.get('input[type="password"]').type('1234');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');
  });

  it('Solicita servicio sin archivo, luego hace logout y después flujo trabajador login y Hora de Trabajar', () => {
    // Navegar a Domus
    cy.get('p.logo').click();

    // Click en "Buscar Profesional"
    cy.get('button.boton-pide-un-experto').click();

    // Verificar URL solicitarServicio
    cy.url().should('include', '/solicitarServicio');

    // Seleccionar tipo de servicio
    cy.get('select#tipoServicio').then(($select) => {
      cy.wrap($select).find('option').its('length').should('be.gte', 2);
      cy.wrap($select).select($select.find('option').eq(1).val());
    });

    // Descripción
    cy.get('textarea#descripcion').type('Necesito un servicio rápido y eficiente.');

    // Dirección
    cy.get('input#direccion').type('Av. Siempre Viva 742');

    // Fecha directo en input
    cy.get('input[placeholder="MM/DD/YYYY"]').clear().type('05/25/2025');

    // Hora directo en input
    cy.get('input[placeholder="hh:mm aa"]').clear().type('10:00 AM');

    // Enviar formulario
    cy.get('button.botonPublicar').click();

    // Esperar alerta
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Solicitud publicada y agendada con éxito');
    });

    // Hacer logout
    cy.get('p.iniciarSesion').contains('Cerrar Sesión').click();

    // Confirmar confirmación si hay
    cy.on('window:confirm', () => true);

    // Verificar que vuelve a página inicial
    cy.url().should('eq', 'http://localhost:3001/');
    cy.get('p.iniciarSesion').should('exist');

    // Login flujo trabajador
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('lucia@example.com');
    cy.get('input[type="password"]').type('abcd');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');

    // Click en logo y luego en "Hora de Trabajar"
    cy.get('p.logo').click();
    cy.get('button.boton-hora-trabajar').should('contain', 'Hora de Trabajar').click();
  });
});
