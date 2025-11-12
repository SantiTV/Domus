describe('Flujo cliente: login y acceder a "Únete Como Experto"', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('carlos@example.com');
    cy.get('input[type="password"]').type('1234');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');
  });

  it('Hace clic en el logo y luego en "Únete Como Experto"', () => {
    cy.get('p.logo').click();
    cy.get('button.boton-unete').should('contain', 'Únete Como Experto').click();
  });
});
