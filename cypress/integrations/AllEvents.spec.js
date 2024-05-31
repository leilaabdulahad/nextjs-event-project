// cypress/integration/AllEvents.spec.js
describe('AllEvents', () => {
    beforeEach(() => {
        cy.visit('/'); 
    });

    it('renders All events heading', () => {
        cy.contains('All events'); 
    });

    it('displays events correctly', () => {
        cy.get('[data-testid="event"]').should('have.length', 5); 
        cy.get('[data-testid="event"]').first().within(() => {
            cy.contains('Event Title'); 
        
        });
    });
    
    it('filters events by location', () => {
        cy.get('[data-testid="location-filter"]').type('Stockholm'); 
        cy.get('[data-testid="event"]').should('have.length', 2); 
    });

   
});