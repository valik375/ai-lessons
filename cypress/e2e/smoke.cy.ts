describe('Окружение E2E', () => {
  it('открывает приложение и получает каталог от локального API', () => {
    cy.intercept('GET', '/api/products').as('products');
    cy.visit('/');
    cy.wait('@products').its('response.statusCode').should('eq', 200);
    cy.contains('h1', 'Место, где').should('be.visible');
    cy.get('article').should('have.length', 6);
  });
});
