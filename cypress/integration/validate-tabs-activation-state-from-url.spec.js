import {
    expectSelectedTabIsActiveWhileOthersNot
} from '../support/helpers';

describe('Validate tabs activation state from url works correctly', () => {
    before(() => {
        cy.visit('/?vertical-tabs-1=tab-control-vertical-tabs-1-item-3&horizontal-tabs-1=tab-control-horizontal-tabs-1-item-2&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2#horizontal-tabs-2');
        cy.injectAxe();
    });

    context('When page is loaded', () => {
        it('should Horizontal Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#horizontal-tabs-1',
                tabControlId: 'tab-control-horizontal-tabs-1-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-1-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Horizontal Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 2,
                contextSelector: '#horizontal-tabs-2',
                tabControlId: 'tab-control-horizontal-tabs-2-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Vertical Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#vertical-tabs-1',
                tabControlId: 'tab-control-vertical-tabs-1-item-3',
                tabPanelId: 'tab-panel-vertical-tabs-1-item-3',
                tabControlText: 'Tab 3'
            });
        });

        it('should Vertical Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#tabs-1',
                tabControlId: 'tab-control-2',
                tabPanelId: 'tab-panel-2',
                tabControlText: 'No title tab'
            });
        });

        it('should pass accessibility test', () => {
            cy.checkA11y();
        });
    });

    context('When user select 1st tab from "Vertical Tabs 1" and 1st tab from "Horizontal Tabs 2"', () => {
        before(() => {
            cy.get('#vertical-tabs-1 .tab-list')
                .find('.tab-control')
                .eq(0)
                .click()
                .tab({ shift: true })
                .tab({ shift: true })
                .tab({ shift: true })
                .type('{leftarrow}')
        });

        it('should Horizontal Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#horizontal-tabs-1',
                tabControlId: 'tab-control-horizontal-tabs-1-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-1-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Horizontal Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 2,
                contextSelector: '#horizontal-tabs-2',
                tabControlId: 'tab-control-horizontal-tabs-2-item-1',
                tabPanelId: 'tab-panel-horizontal-tabs-2-item-1',
                tabControlText: 'Tab 1'
            });
        });

        it('should Vertical Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#vertical-tabs-1',
                tabControlId: 'tab-control-vertical-tabs-1-item-1',
                tabPanelId: 'tab-panel-vertical-tabs-1-item-1',
                tabControlText: 'Tab 1'
            });
        });

        it('should Vertical Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#tabs-1',
                tabControlId: 'tab-control-2',
                tabPanelId: 'tab-panel-2',
                tabControlText: 'No title tab'
            });
        });

        it('should pass accessibility test', () => {
            cy.checkA11y();
        });
    });

    context('When navigate back twice browser history', () => {
        before(()=> {
            cy.go(-2)
                .go('back');
        });

        it('should Horizontal Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#horizontal-tabs-1',
                tabControlId: 'tab-control-horizontal-tabs-1-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-1-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Horizontal Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 2,
                contextSelector: '#horizontal-tabs-2',
                tabControlId: 'tab-control-horizontal-tabs-2-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Vertical Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#vertical-tabs-1',
                tabControlId: 'tab-control-vertical-tabs-1-item-3',
                tabPanelId: 'tab-panel-vertical-tabs-1-item-3',
                tabControlText: 'Tab 3'
            });
        });

        it('should Vertical Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#tabs-1',
                tabControlId: 'tab-control-2',
                tabPanelId: 'tab-panel-2',
                tabControlText: 'No title tab'
            });
        });

        it('should pass accessibility test', () => {
            cy.checkA11y();
        });
    });

    context('When navigate forward once browser history', () => {
        before(()=> {
            cy.go('forward');
        });

        it('should Horizontal Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#horizontal-tabs-1',
                tabControlId: 'tab-control-horizontal-tabs-1-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-1-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Horizontal Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 2,
                contextSelector: '#horizontal-tabs-2',
                tabControlId: 'tab-control-horizontal-tabs-2-item-2',
                tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
                tabControlText: 'Tab 2'
            });
        });

        it('should Vertical Tabs 1\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#vertical-tabs-1',
                tabControlId: 'tab-control-vertical-tabs-1-item-1',
                tabPanelId: 'tab-panel-vertical-tabs-1-item-1',
                tabControlText: 'Tab 1'
            });
        });

        it('should Vertical Tabs 2\'s selected tab activated correctly', () => {
            expectSelectedTabIsActiveWhileOthersNot({
                totalItems: 3,
                contextSelector: '#tabs-1',
                tabControlId: 'tab-control-2',
                tabPanelId: 'tab-panel-2',
                tabControlText: 'No title tab'
            });
        });

        it('should pass accessibility test', () => {
            cy.checkA11y();
        });
    });
});