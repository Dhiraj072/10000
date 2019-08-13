describe('Acceptance test account features', () => {
    it('should login as guest correctly', () => {
        cy.loginAsGuest();
        cy.contains('My skills').should('exist');
        cy.contains('Add skill').should('exist');
        cy.contains('Account').should('exist');
    });

    it('should redirect automatically when logged in', () => {
        cy.visit('/');
        cy.contains('My skills').should('exist');
        cy.contains('Add skill').should('exist');
        cy.contains('Account').should('exist');
    });

    it('should logout correctly', () => {
        cy.visitTab('Account');
        cy.get('[data-testid="logout"]').click();
        cy.contains('Continue as Guest').should('exist');
    })
});