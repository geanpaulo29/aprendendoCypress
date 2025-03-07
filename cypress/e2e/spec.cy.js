describe('Formulário de Cadastro', () => {
  it('Preenche e envia o formulário com sucesso', () => {
    cy.visit('index.html');

    cy.get('#nome').type('João Silva');
    cy.get('#email').type('joao.silva@email.com');
    cy.get('#telefone').type('1199999999');
    cy.get('#senha').type('Teste@123');
    cy.get('#confirma_senha').type('Teste@123');

    cy.get('#nome').should('have.value', 'João Silva');
    cy.get('#email').should('have.value', 'joao.silva@email.com');
    cy.get('#telefone').should('have.value', '1199999999');
    cy.get('#senha').should('have.value', 'Teste@123');
    cy.get('#confirma_senha').should('have.value', 'Teste@123');

    cy.get('form').submit();

  });
});