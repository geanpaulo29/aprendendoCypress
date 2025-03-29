describe('Teste de Avaliação de Veículo', () => {
  beforeEach(() => {
      cy.visit('index.html');
  });

  it('Verifica se os elementos estão visíveis', () => {
      cy.contains('h1', 'Avaliação do Veículo').should('be.visible');
      cy.get('#nome').should('be.visible');
      cy.get('#comentario').should('be.visible');
      cy.get('#submit-button').should('be.visible');
      cy.get('#avaliacoes').should('be.empty');
  });

  it('Valida textos e atributos', () => {
      cy.get('#submit-button').should('have.text', 'Enviar Avaliação');
      cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome');
      cy.get('#comentario').should('have.attr', 'placeholder', 'Descreva sua experiência com o veículo...');
  });

  it('Testa envio de avaliação com dados válidos', () => {
      cy.get('#nome').type('João');
      cy.get('#comentario').type('Ótimo carro, muito confortável!');
      cy.get('#submit-button').click();

      cy.get('#loading').should('be.visible');
      cy.wait(3000);
      cy.get('#loading').should('not.be.visible');
      cy.get('#avaliacoes').contains('João: Ótimo carro, muito confortável!');
  });

  it('Testa erro ao enviar sem nome', () => {
      cy.get('#comentario').type('Muito econômico!');
      cy.get('#submit-button').click();
      cy.on('window:alert', (str) => {
          expect(str).to.equal('Por favor, preencha todos os campos.');
      });
  });

  it('Testa erro ao enviar sem comentário', () => {
      cy.get('#nome').type('Maria');
      cy.get('#submit-button').click();
      cy.on('window:alert', (str) => {
          expect(str).to.equal('Por favor, preencha todos os campos.');
      });
  });
});
