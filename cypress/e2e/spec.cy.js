describe('Login do Aluno - Área de Membros', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5500/index.html'); 
  });

  it('Fazer login corretamente, criar cookie e salvar no localStorage', () => {
    cy.get('#email').type('aluno@curso.com');
    cy.get('#senha').type('curso2024');
    cy.get('button[type="submit"]').click();

    cy.get('#mensagem').should('contain', 'Acesso concedido!');

    cy.getCookie('curso_token').should('exist').and('have.property', 'value', 'curso123');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('aluno_email')).to.equal('aluno@curso.com');
    });

    cy.reload();

    cy.getCookie('curso_token').should('exist').and('have.property', 'value', 'curso123');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('aluno_email')).to.equal('aluno@curso.com');
    });
  });

});
