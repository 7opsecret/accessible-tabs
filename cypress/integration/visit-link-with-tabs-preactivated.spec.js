context('When page visited with url contain activated tabs in query string', () => {
    before(() => {
        cy.visit('/?tabs-1=tab-control-2&tabs-2=tab-control-5#tabs-2');
    });

    it('should first tab group activate correctly on page loaded', () => {
        cy.get('#tabs-1 .tab-control')
            .eq(1)
            .should('have.class', 'tab-control--selected')
            .and('have.attr', 'aria-selected', 'true')
            .and('have.attr', 'tabindex', '0');

        cy.get('#tabs-1 .tab-panel')
            .eq(1)
            .should('have.class', 'tab-panel--selected')
            .not('have.attr', 'hidden')
    });

    it('should second tab group activate correctly on page loaded', () => {
        cy.get('#tabs-2 .tab-control')
            .eq(1)
            .should('have.class', 'tab-control--selected')
            .and('have.attr', 'aria-selected', 'true')
            .and('have.attr', 'tabindex', '0');

        cy.get('#tabs-2 .tab-panel')
            .eq(1)
            .should('have.class', 'tab-panel--selected')
            .not('have.attr', 'hidden')
    });

    it('should pass accessibility test', () => {
        cy.injectAxe();
        cy.checkA11y();
    });
});