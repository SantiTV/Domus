describe('Flujo usuario: login y acceso directo a historial', () => {
  it('Inicia sesión y verifica que la página carga el historial', () => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('carlos@example.com');
    cy.get('input[type="password"]').type('1234');
    cy.contains('button', 'Iniciar sesión').click();

    // Verificar URL que carga el historial (asumiendo /historial o /pagina-usuario)
    cy.url().should('include', '/pagina-usuario');

    // Verificar que el componente HistorialList está visible
    cy.get('div').contains('Historial').should('exist');

    // Opcional: verificar que la opción 'Historial' está activa en el sidebar
    cy.get('button').contains('Historial').should('have.class', 'active');
  });
});
