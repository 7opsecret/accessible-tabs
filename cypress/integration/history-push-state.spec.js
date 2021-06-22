context('Accessible Tabs', () => {
    before(() => {
        cy.visit('/');
    });

    it('should pass accessibility test', () => {
        cy.injectAxe();
        cy.checkA11y();
    });

    it('should tab works in correct order to activated tab control and panel', () => {
        cy.get('body')
            .tab()
            .tab()
            .should('have.class', 'tab-panel tab-panel--selected')
            .and('contain.text', 'Tab 1-1 Lorem ipsum dolor sit amet,');
    });

    it('should tab pass first active tab group\'s control next active element will be 1st active panel', () => {
        cy.focused()
            .tab({ shift: true})
            
            
    });
});