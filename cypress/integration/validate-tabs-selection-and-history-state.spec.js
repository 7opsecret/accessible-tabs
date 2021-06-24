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

describe('Validate tabs activation and history are working correctly', () => {
    before(() => {
        cy.visit('/');
    });

    it('should pass accessibility test', () => {
        cy.injectAxe();
        cy.checkA11y();
    });

    context('When TAB pressed once after page load and Horizontal Tabs 1\'s first tab was focused and pressed LEFT ARROW', () => {
        before(() => {
            cy.get('body')
                .tab()
                .type('{leftarrow}');
        });

        it('should url and history updated with previous state which included activated tabs from all other tab groups in the page', () => {
            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3');
                    expect(loc.hash).to.eq('#horizontal-tabs-1');
                });
        });

        it('should Horizontal Tabs 1\'s selected tab activated', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });
        });

        it('should Horizontal Tabs 2 (tab group) remain default unchanged', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-1',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-1',
                containText: 'Tab 1'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-1',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-1'
            });
        });

        it('should Vertical Tabs 1 (tab group) remain default unchanged', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-1',
                ariaControls: 'tab-panel-vertical-tabs-1-item-1',
                containText: 'Tab 1'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-1',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-1'
            });
        });

        it('should Vertical Tabs 2 (tab group) remain default unchanged', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-2',
                ariaControls: 'tab-panel-2',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-2',
                ariaLabelledBy: 'tab-control-2'
            });
        });
    });

    context('When Horizontal Tabs 2\'s 2nd (from left) item is clicked and activated', () => {
        before(() => {
            cy.get('#horizontal-tabs-2 .tab-list')
                .find('.tab-control')
                .eq(1)
                .click();
        });

        it('should url and history updated with previous state which included activated tabs from all other tab groups in the page', () => {
            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2');
                    expect(loc.hash).to.eq('#horizontal-tabs-2');
                });
        });

        it('should Horizontal Tabs 1\'s selected tab activated', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });
        });

        it('should Horizontal Tabs 2\'s selected tab activated', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-2',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-2',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-2'
            });
        });

        it('should Vertical Tabs 1 (tab group) remain default unchanged', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-1',
                ariaControls: 'tab-panel-vertical-tabs-1-item-1',
                containText: 'Tab 1'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-1',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-1'
            });
        });

        it('should Vertical Tabs 2 (tab group) remain default unchanged', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-2',
                ariaControls: 'tab-panel-2',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-2',
                ariaLabelledBy: 'tab-control-2'
            });
        });
    });

    context('When TAB pressed 3 times from last focused element (Horizontal Tabs 2\'s "Tab 2" tab control) and pressed DOWN ARROW twice', () => {
        before(() => {
            cy.focused()
                .tab()
                .tab()
                .tab()
                .type('{downarrow}{downarrow}');
        });

        it('should url and history updated with previous state which included activated tabs from all other tab groups in the page', () => {
            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3');
                    expect(loc.hash).to.eq('#vertical-tabs-1');
                });
        });

        it('should Horizontal Tabs 1 (tab group) previous state retained', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });
        });

        it('should Horizontal Tabs 2 (tab group) previous state retained', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-2',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-2',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-2'
            });
        });

        it('should Vertical Tabs 1 (tab group) tab activated successfully', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-3',
                ariaControls: 'tab-panel-vertical-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-3'
            });
        });

        it('should Vertical Tabs 2 (tab group) remain default unchanged', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-2',
                ariaControls: 'tab-panel-2',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-2',
                ariaLabelledBy: 'tab-control-2'
            });
        });
    });

    context('When Vertical Tabs 2\'s 2nd (from top) item is clicked and activated', () => {
        before(() => {
            cy.get('#tabs-1 .tab-list')
                .find('.tab-control')
                .eq(1)
                .click();
        });

        it('should url and history updated with dynamic generated id (for no id provided tabs) and previous state which included activated tabs from all other tab groups in the page', () => {
            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3&tabs-1=tab-control-3');
                    expect(loc.hash).to.eq('#tabs-1');
                });
        });

        it('should Horizontal Tabs 1 (tab group) previous state retained', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });
        });

        it('should Horizontal Tabs 2 (tab group) previous state retained', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-2',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-2',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-2'
            });
        });

        it('should Vertical Tabs 1 (tab group) previous state retained', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-3',
                ariaControls: 'tab-panel-vertical-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-3'
            });
        });

        it('should Vertical Tabs 2 (tab group) tab activated successfully', () => {
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-3',
                ariaControls: 'tab-panel-3',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-3',
                ariaLabelledBy: 'tab-control-3'
            });
        });
    });

    context('When navigate back or forward between browser history', () => {
        it('should all activated tabs and url render correctly when go back once', () => {
            cy.go('back');

            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3');
                    expect(loc.hash).to.eq('#vertical-tabs-1');
                });

            // Horizontal Tabs 1 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });

            // Horizontal Tabs 2 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-2',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-2',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-2'
            });

            // Vertical Tabs 1 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-3',
                ariaControls: 'tab-panel-vertical-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-3'
            });

            // Vertical Tabs 2 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-2',
                ariaControls: 'tab-panel-2',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-2',
                ariaLabelledBy: 'tab-control-2'
            });
        });

        it('should all activated tabs and url render correctly when go back again', () => {
            cy.go('back');

            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-2');
                    expect(loc.hash).to.eq('#vertical-tabs-1');
                });

            // Horizontal Tabs 1 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });

            // Horizontal Tabs 2 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-2',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-2',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-2'
            });

            // Vertical Tabs 1 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-2',
                ariaControls: 'tab-panel-vertical-tabs-1-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-2',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-2'
            });

            // Vertical Tabs 2 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-2',
                ariaControls: 'tab-panel-2',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-2',
                ariaLabelledBy: 'tab-control-2'
            });
        });

        it('should all activated tabs and url render correctly when go forward twice', () => {
            cy.go('forward')
                .go('forward');

            // url and history updated with dynamic
            cy.location()
                .should((loc) => {
                    expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3&tabs-1=tab-control-3');
                    expect(loc.hash).to.eq('#tabs-1');
                });

            // Horizontal Tabs 1 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-control-horizontal-tabs-1-item-3',
                ariaControls: 'tab-panel-horizontal-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#horizontal-tabs-1',
                id: 'tab-panel-horizontal-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-horizontal-tabs-1-item-3'
            });

            // Horizontal Tabs 2 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-control-horizontal-tabs-2-item-2',
                ariaControls: 'tab-panel-horizontal-tabs-2-item-2',
                containText: 'Tab 2'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 2,
                contextSelector: '#horizontal-tabs-2',
                id: 'tab-panel-horizontal-tabs-2-item-2',
                ariaLabelledBy: 'tab-control-horizontal-tabs-2-item-2'
            });

            // Vertical Tabs 1 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-control-vertical-tabs-1-item-3',
                ariaControls: 'tab-panel-vertical-tabs-1-item-3',
                containText: 'Tab 3'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#vertical-tabs-1',
                id: 'tab-panel-vertical-tabs-1-item-3',
                ariaLabelledBy: 'tab-control-vertical-tabs-1-item-3'
            });

            // Vertical Tabs 2 (tab group)
            expectSelectedTabControlIsActiveWhileOthersNot({
                totalControls: 3,
                contextSelector: '#tabs-1',
                id: 'tab-control-3',
                ariaControls: 'tab-panel-3',
                containText: 'No title tab'
            });

            expectSelectedTabPanelIsActiveWhileOthersNot({
                totalPanels: 3,
                contextSelector: '#tabs-1',
                id: 'tab-panel-3',
                ariaLabelledBy: 'tab-control-3'
            });
        });
    });
});