describe('Flujo cliente: login, acceder a historial y dejar reseña', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
    cy.get('p.iniciarSesion').click();
    cy.get('input[type="email"]').type('carlos@example.com');
    cy.get('input[type="password"]').type('1234');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url().should('include', '/pagina-usuario');
  });

  it('Hace clic en "Reseña", califica con estrellas y escribe un comentario', () => {
    // Verifica que cargó la sección del historial
    cy.contains('¡Mis Servicios Solicitados!');

    // Hacer clic en el botón de "Reseña"
    cy.get('button.user-history-button').contains('Reseña').click();

    // Esperar que se abra el modal
    cy.get('.review-modal-content').should('be.visible');

    // Seleccionar 4 estrellas (índice 3)
    cy.get('.review-stars .star').eq(3).click();

    // Escribir un comentario
    cy.get('.review-textarea').type('Muy buen servicio, puntual y amable.');

    // Hacer clic en "Calificar"
    cy.get('.review-buttons .btn-primary').contains('Calificar').click();

    // Verificar confirmación (opcional, si aparece un mensaje o desaparece el modal)
    cy.get('.review-modal-content').should('not.exist');
  });
});
