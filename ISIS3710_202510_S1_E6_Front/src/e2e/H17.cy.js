describe('Flujo trabajador: login y acceder a "Hora de Trabajar" y Calendario', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('lucia@example.com');
    cy.get('input[type="password"]').type('abcd');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');
  });

  it('Hace clic en el logo, en "Hora de Trabajar" y luego en el ícono de Calendario', () => {
    cy.get('p.logo').click();
    cy.get('button.boton-hora-trabajar').should('contain', 'Hora de Trabajar').click();
    cy.get('.icon-container img[alt="Calendario"]').click();
  });
});
