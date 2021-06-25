describe('Validate orientation works correctly', () => {
    before(() => {
        cy.visit('/');
    });

    it('should horizontal tab-list element have required class and attribute', () => {
        cy.get('#horizontal-tabs-1 .tab-list')
                .should('have.class', 'tab-list--horizontal')
                .and('have.attr', 'aria-orientation', 'horizontal');
    });

    it('should vertical tab-list element have required class and attribute', () => {
        cy.get('#vertical-tabs-1 .tab-list')
            .should('have.class', 'tab-list--vertical')
            .and('have.attr', 'aria-orientation', 'vertical');
    });
});