describe('Flujo trabajador: login y acceder a "Hora de Trabajar"', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('lucia@example.com');
    cy.get('input[type="password"]').type('abcd');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');
  });

  it('Hace clic en el logo y luego en "Hora de Trabajar"', () => {
    cy.get('p.logo').click();
    cy.get('button.boton-hora-trabajar').should('contain', 'Hora de Trabajar').click();
  });
});
