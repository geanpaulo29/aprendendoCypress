describe('Testes da plataforma EduTech', () => {

    beforeEach(() => {
      cy.clearLocalStorage();
    });
  
    it('Navegar da Home para a página de Login', () => {
      cy.visit('/home.html');
      cy.contains('Entrar').click();
      cy.url().should('include', '/login.html');
    });
  
    it('Realizar login com sucesso', () => {
      cy.visit('/login.html');
      cy.get('#email').type('aluno@edutech.com');
      cy.get('#senha').type('curso123');
      cy.get('form').submit();
      cy.url().should('include', '/painel.html');
      cy.contains('Bem-vindo, aluno!');
    });
  
    it('Mostrar erro em login inválido', () => {
      cy.visit('/login.html');
      cy.get('#email').type('aluno@edutech.com');
      cy.get('#senha').type('senhaErrada');
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal('E-mail ou senha incorretos!');
      });
  
      cy.get('form').submit();
    });
  
    it('Redirecionar para login ao acessar página protegida sem estar logado', () => {
      cy.visit('/meus-cursos.html');
      cy.url().should('include', '/login.html');
    });
  
    it('Permitir logout e voltar para tela de login', () => {
      cy.visit('/login.html');
      cy.get('#email').type('aluno@edutech.com');
      cy.get('#senha').type('curso123');
      cy.get('form').submit();
  
      cy.url().should('include', '/painel.html');
  
      cy.get('#logout').click();
  
      cy.url().should('include', '/login.html');
  
      cy.visit('/painel.html');
      cy.url().should('include', '/login.html');
    });
  
  });
  