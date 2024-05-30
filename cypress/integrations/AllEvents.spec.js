// cypress/integration/AllEvents.spec.js
describe('AllEvents', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the home page before each test
    });

    it('renders All events heading', () => {
        cy.contains('All events'); // Check that the page contains the text "All events"
    });

    it('displays events correctly', () => {
        cy.get('[data-testid="event"]').should('have.length', 5); // Check that 5 events are displayed
        cy.get('[data-testid="event"]').first().within(() => {
            cy.contains('Event Title'); // Check that the first event has the correct title
            // Add similar checks for the location, date, price, and description
        });
    });

    it('filters events by date', () => {
        cy.get('[data-testid="date-filter"]').type('2022-12-31'); // Set the filter date
        cy.get('[data-testid="event"]').should('have.length', 1); // Check that only 1 event is displayed
    });

    it('filters events by location', () => {
        cy.get('[data-testid="location-filter"]').type('Stockholm'); // Set the filter location
        cy.get('[data-testid="event"]').should('have.length', 2); // Check that only 2 events are displayed
    });

    it('navigates to event details page', () => {
        cy.get('[data-testid="event"]').first().click(); // Click on the first event
        cy.url().should('include', '/dashboard/allevents/1'); // Check that the URL includes the correct path
    });
});