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
            .and('contain.text', 'With horizontal orientation. You can navigate between the Tabs and Panels with Left Arrow / Right Arrow keyboard event');
    });

    it('should tab pass first active tab group\'s control next active element will be 1st active panel', () => {
        cy.focused()
            .tab({ shift: true})
    });
});