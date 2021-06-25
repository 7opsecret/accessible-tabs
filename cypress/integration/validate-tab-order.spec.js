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

describe('Validate tabs activation and history are working correctly', () => {
    before(() => {
        cy.visit('/');
    });

    it('should pass accessibility test', () => {
        cy.injectAxe();
        cy.checkA11y();
    });

    it('should tab order works correctly', () => {
        cy.get('body')
            .tab();

        expectFocusedTabControlIsActive({
            id: 'tab-control-horizontal-tabs-1-item-1',
            ariaControls: 'tab-panel-horizontal-tabs-1-item-1',
            ariaSelected: 'true',
            containText: 'Tab 1'
        });

        cy.focused()
            .tab();

        expectFocusedTabPanelIsActive({
            id: 'tab-panel-horizontal-tabs-1-item-1',
            ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-1',
            containText: 'With horizontal orientation. You can navigate between'
        });

        cy.focused()
            .tab();

        expectFocusedTabControlIsActive({
            id: 'tab-control-horizontal-tabs-2-item-1',
            ariaControls: 'tab-panel-horizontal-tabs-2-item-1',
            ariaSelected: 'true',
            containText: 'Tab 1'
        });

        cy.focused()
            .tab();

        expectFocusedTabPanelIsActive({
            id: 'tab-panel-horizontal-tabs-2-item-1',
            ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-1',
            containText: 'Tab 2-1 Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        });

        cy.focused()
            .tab();

        expectFocusedTabControlIsActive({
            id: 'tab-control-vertical-tabs-1-item-1',
            ariaControls: 'tab-panel-vertical-tabs-1-item-1',
            ariaSelected: 'true',
            containText: 'Tab 1'
        });

        cy.focused()
            .tab();

        expectFocusedTabPanelIsActive({
            id: 'tab-panel-vertical-tabs-1-item-1',
            ariaLabelledBy: 'tab-control-vertical-tabs-1-item-1',
            containText: 'With vertical orientation. You can navigate between'
        });
    });
});