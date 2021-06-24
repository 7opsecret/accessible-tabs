const expectFocusedTabPanelIsActive = ({
    id,
    ariaLabelledBy,
    containText
}) => {
    cy.focused()
        .should('have.class', 'tab-panel tab-panel--selected')
        .and('have.id', id)
        .and('have.attr', 'aria-labelledby', ariaLabelledBy)
        .not('have.attr', 'hidden')
        .and('contain.text', containText);
}

const expectFocusedTabControlIsActive = ({
    id,
    ariaControls,
    ariaSelected,
    containText
}) => {
    cy.focused()
        .should('have.class', 'tab-control tab-control--selected')
        .and('have.id', id)
        .and('have.attr', 'aria-controls', ariaControls)
        .and('have.attr', 'aria-selected', ariaSelected)
        .and('have.attr', 'role', 'tab')
        .and('have.attr', 'tabindex', 0)
        .and('contain.text', containText);
}

const expectSelectedTabControlIsActiveWhileOthersNot = ({
    totalControls,
    id,
    contextSelector,
    ariaControls,
    containText
}) => {
    cy.get(contextSelector)
        .find('.tab-control')
        .should('have.length', totalControls)
        .and('have.attr', 'role', 'tab');

    cy.get(contextSelector)
        .find('.tab-control.tab-control--selected')
        .should('have.id', id)
        .and('have.attr', 'aria-controls', ariaControls)
        .and('have.attr', 'aria-selected', 'true')
        .and('have.attr', 'tabindex', 0)
        .and('contain.text', containText);

    cy.get(contextSelector)
        .find('.tab-control')
        .not('.tab-control--selected')
        .should('have.length', totalControls - 1)
        .each(($el) => {
            cy.wrap($el)
                .should('have.attr', 'tabindex', -1)
                .and('have.attr', 'aria-selected', 'false');
        });
}

const expectSelectedTabPanelIsActiveWhileOthersNot = ({
    totalPanels,
    contextSelector,
    id,
    ariaLabelledBy
}) => {
    cy.get(contextSelector)
        .find('.tab-panel')
        .should('have.length', totalPanels);

    cy.get(contextSelector)
        .find('.tab-panel.tab-panel--selected')
        .should('have.length', 1)
        .and('have.id', id)
        .and('have.attr', 'aria-labelledby', ariaLabelledBy)
        .not('have.attr', 'hidden');

    cy.get(contextSelector)
        .find('.tab-panel')
        .not('.tab-panel--selected')
        .should('have.length', totalPanels - 1)
        .each(($el) => {
            cy.wrap($el)
                .should('have.attr', 'hidden')
        });
}

context('Validate tabs activation and history are working correctly', () => {
    before(() => {
        cy.visit('/');
    });

    it('should pass accessibility test', () => {
        cy.injectAxe();
        cy.checkA11y();
    });

    it('should tab works in correct order', () => {
        cy.get('body')
            .tab();

        expectFocusedTabControlIsActive({
            id: 'tab-control-1',
            ariaControls: 'tab-panel-1',
            ariaSelected: 'true',
            containText: 'Tab 1'
        });

        cy.focused()
            .tab();

        expectFocusedTabPanelIsActive({
            id: 'tab-panel-1',
            ariaLabelledBy: 'tab-control-1',
            containText: 'With horizontal orientation. You can navigate between'
        });
    });

    it('should Horizontal Tabs 1\'s last tab activated when pressed keyboard "left arrow"', () => {
        cy.get('body')
            .tab()
            .type('{leftarrow}');

        cy.location()
            .should((loc) => {
                expect(loc.search).to.eq('?tabs-1=tab-control-3');
                expect(loc.hash).to.eq('#tabs-1');
            });

        expectSelectedTabControlIsActiveWhileOthersNot({
            totalControls: 3,
            contextSelector: '#tabs-1',
            id: 'tab-control-3',
            ariaControls: 'tab-panel-3',
            containText: 'Tab 3'
        });

        expectSelectedTabPanelIsActiveWhileOthersNot({
            totalPanels: 3,
            contextSelector: '#tabs-1',
            id: 'tab-panel-3',
            ariaLabelledBy: 'tab-control-3'
        });
    });
});