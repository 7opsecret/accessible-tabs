describe('Given page visited with url contain activated tabs in query string', () => {
    before(() => {
        cy.visit('/?vertical-tabs-1=tab-control-vertical-tabs-1-item-3&horizontal-tabs-1=tab-control-horizontal-tabs-1-item-2&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2#horizontal-tabs-2');
    });

    it('should first horizontal tab group activate correctly on page loaded', () => {
        cy.get('#horizontal-tabs-1 .tab-control')
            .eq(1)
            .should('have.class', 'tab-control--selected')
            .and('have.attr', 'aria-selected', 'true')
            .and('have.attr', 'tabindex', '0');

        cy.get('#horizontal-tabs-1 .tab-panel')
            .eq(1)
            .should('have.class', 'tab-panel--selected')
            .not('have.attr', 'hidden');

        cy.get('#horizontal-tabs-1 .tab-list')
            .should('have.class', 'tab-list--horizontal')
            .and('have.attr', 'aria-orientation', 'horizontal');
    });

    it('should second horizontal tab group activate correctly on page loaded', () => {
        cy.get('#horizontal-tabs-2 .tab-control')
            .eq(1)
            .should('have.class', 'tab-control--selected')
            .and('have.attr', 'aria-selected', 'true')
            .and('have.attr', 'tabindex', '0');

        cy.get('#horizontal-tabs-2 .tab-panel')
            .eq(1)
            .should('have.class', 'tab-panel--selected')
            .not('have.attr', 'hidden');

        cy.get('#horizontal-tabs-2 .tab-list')
            .should('have.class', 'tab-list--horizontal')
            .and('have.attr', 'aria-orientation', 'horizontal');
    });

    it('should first vertical tab group activate correctly on page loaded', () => {
        cy.get('#vertical-tabs-1 .tab-control')
            .eq(2)
            .should('have.class', 'tab-control--selected')
            .and('have.attr', 'aria-selected', 'true')
            .and('have.attr', 'tabindex', '0');

        cy.get('#vertical-tabs-1 .tab-panel')
            .eq(2)
            .should('have.class', 'tab-panel--selected')
            .not('have.attr', 'hidden');

        cy.get('#vertical-tabs-1 .tab-list')
            .should('have.class', 'tab-list--vertical')
            .and('have.attr', 'aria-orientation', 'vertical');
    });

    it('should pass accessibility test', () => {
        cy.injectAxe();
        cy.checkA11y();
    });
});