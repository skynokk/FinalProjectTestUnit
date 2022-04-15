describe("ProjetFinal", () => {
  Cypress.config('defaultCommandTimeout', 10000);

  it("Test button Panier", () => {
    cy.visit("http://127.0.0.1:3000");
    cy.contains("Aller sur panier");
  });

  it("Test read product", () => {
    cy.visit("http://localhost:3000");
    cy.wait(30000);
    cy.contains("Aller sur panier");
    cy.contains("Figurine de Summer Smith").click();
    cy.contains("Ajouter au panier")
    cy.contains("Retour").click();
    cy.wait(30000);
    cy.contains("Aller sur panier");
  });

  it("Test add product", () => {
    cy.visit("http://127.0.0.1:3000");
    cy.wait(30000);
    cy.contains("Figurine de Summer Smith").click();
    cy.contains("Ajouter au panier").click();
    cy.wait(30000);
    cy.contains("Enregistré dans le panier")
    cy.contains("Retour").click();
    cy.wait(30000);
    cy.contains("Aller sur panier").click();
    cy.wait(30000);
    cy.contains("Figurine de Summer Smith");
  });

  // it("Test delete product", () => {
  //   cy.visit("http://localhost:3000");
  //   cy.wait(30000);
  //   cy.contains("Figurine de Summer Smith").click();
  //   cy.contains("Ajouter au panier").click();
  //   cy.contains("Retour").click();
  //   cy.wait(30000);
  //   cy.contains("Aller sur panier").click();
  //   cy.wait(30000);
  //   cy.contains("Supprimer du panier").click();
  //   cy.get('Figurine de Summer Smith').should('not.exist');
  //   cy.wait(30000);
  //   cy.contains("Produit bien supprimé");
  // });

  // it("Test add product too much quantity", () => {
  //   cy.visit("http://localhost:3000");
  //   cy.wait(30000);
  //   cy.contains("Figurine de Summer Smith").click();
  //   cy.get('input').type('00').type('{enter}')
  //   cy.contains("Ajouter au panier").click();
  //   cy.wait(30000);
  //   cy.contains("Trop de quantité")
  // });
});


