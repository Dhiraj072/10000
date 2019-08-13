const TEST_SKILL_1 = "FOO_1";
const TEST_SKILL_2 = "FOO_2";
const TEST_DESC_1 = "BAR_1";
const TEST_DESC_2 = "BAR_2";
const TARGET_HOURS_1 = "10";
const TARGET_HOURS_2 = "100";

describe('Acceptance test skill features', () => {
    before(() => {
        cy.loginAsGuest();
    });

    after(() => {
        cy.visitTab('My skills');
        cy.get('[data-testid="delete-skill"]').should('have.length', 0);
    });

    it('should add new skills correctly', () => {
        cy.visitTab('Add skill');
        cy.get('[id="name"]').type(TEST_SKILL_1);
        cy.get('[id="description"').type(TEST_DESC_1);
        cy.get('[id="targetHours"]').type(TARGET_HOURS_1);
        cy.get('[data-testid="add-skill"').click();
        cy.get('[id="name"]').type(TEST_SKILL_2);
        cy.get('[id="description"]').type(TEST_DESC_2);
        cy.get('[id="targetHours"]').type(TARGET_HOURS_2);
        cy.get('[data-testid="add-skill"').click();
    });

    it('should display summary list of added skills correctly', () => {
        cy.visitTab('My skills');
        cy.get('[data-testid="delete-skill"]').should('have.length', 2);
        cy.contains(TEST_SKILL_1).should('be.visible');
        cy.contains(TEST_SKILL_2).should('be.visible');
        cy.contains(TEST_DESC_1).should('not.be.visible');
    });

    it('should display and hide details of skill correctly', () => {
        cy.contains(TEST_SKILL_1).click();
        cy.contains('Description').should('be.visible');
        cy.contains('Description').next().should('have.text', TEST_DESC_1);
        cy.contains('Target hours').should('be.visible');
        cy.contains('Target hours').next().should('have.text', TARGET_HOURS_1);
        cy.contains('Achieved hours').should('be.visible');
        cy.contains('Achieved hours').next().should('have.text', '0');
        cy.contains('Started on').should('be.visible');
    });

    it('should update achieved hours for a skill correctly', () => {
        cy.get('[id="achievedHours"]').first().type(TARGET_HOURS_2);
        cy.get('[data-testid="update-skill"]').first().click();
        cy.contains('Achieved hours').next().should('have.text', TARGET_HOURS_2);
        cy.contains(TEST_SKILL_1).click();
    });

    it('should remove a skill correctly', () => {
        cy.get('[data-testid="delete-skill"]').should('have.length', 2);
        cy.get('[data-testid="delete-skill"]').first().click();
        cy.get('[data-testid="delete-skill"]').should('have.length', 1);
        cy.get('[data-testid="delete-skill"]').first().click();
    });
});