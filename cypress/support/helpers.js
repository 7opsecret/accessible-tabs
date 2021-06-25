export const expectSelectedTabControlIsActiveWhileOthersNot = ({
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

export const expectSelectedTabPanelIsActiveWhileOthersNot = ({
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

export const expectSelectedTabIsActiveWhileOthersNot = ({
    totalItems,
    contextSelector,
    tabControlId,
    tabPanelId,
    tabControlText
}) => {
    expectSelectedTabControlIsActiveWhileOthersNot({
        totalControls: totalItems,
        contextSelector: contextSelector,
        id: tabControlId,
        ariaControls: tabPanelId,
        containText: tabControlText
    });

    expectSelectedTabPanelIsActiveWhileOthersNot({
        totalPanels: totalItems,
        contextSelector: contextSelector,
        id: tabPanelId,
        ariaLabelledBy: tabControlId
    });
}