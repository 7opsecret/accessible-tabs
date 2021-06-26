/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelectedTabIsActiveWhileOthersNot", "cy.checkA11y"] }] */
import {
  expectSelectedTabIsActiveWhileOthersNot
} from '../support/helpers'

describe('Validate tabs selection and history state are working correctly', () => {
  before(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('should pass accessibility test', () => {
    // Assert
    cy.checkA11y()
  })

  context('When TAB pressed once after page load and Horizontal Tabs 1 (tab group) first tab was focused and pressed LEFT ARROW', () => {
    before(() => {
      // Act
      cy.get('body')
        .tab()
        .type('{leftarrow}')
    })

    it('should url and history updated with previous state which included activated tabs from all other tab groups in the page', () => {
      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3')
          expect(loc.hash).to.eq('#horizontal-tabs-1')
        })
    })

    it('should Horizontal Tabs 1 (tab group) selected tab activated', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })
    })

    it('should Horizontal Tabs 2 (tab group) remain default unchanged', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-1',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-1',
        tabControlText: 'Tab 1'
      })
    })

    it('should Vertical Tabs 1 (tab group) remain default unchanged', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-1',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-1',
        tabControlText: 'Tab 1'
      })
    })

    it('should Vertical Tabs 2 (tab group) remain default unchanged', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-2',
        tabPanelId: 'tab-panel-2',
        tabControlText: 'No title tab'
      })
    })
  })

  context('When Horizontal Tabs 2 (tab group) 2nd (from left) Tab Control (button) is clicked and activated', () => {
    before(() => {
      // Act
      cy.get('#horizontal-tabs-2 .tab-list')
        .find('.tab-control')
        .eq(1)
        .click()
    })

    it('should url and history updated with previous state which included activated tabs from all other tab groups in the page', () => {
      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2')
          expect(loc.hash).to.eq('#horizontal-tabs-2')
        })
    })

    it('should Horizontal Tabs 1 (tab group) selected tab activated', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })
    })

    it('should Horizontal Tabs 2 (tab group) selected tab activated', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-2',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
        tabControlText: 'Tab 2'
      })
    })

    it('should Vertical Tabs 1 (tab group) remain default unchanged', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-1',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-1',
        tabControlText: 'Tab 1'
      })
    })

    it('should Vertical Tabs 2 (tab group) remain default unchanged', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-2',
        tabPanelId: 'tab-panel-2',
        tabControlText: 'No title tab'
      })
    })
  })

  context('When TAB pressed 3 times from last focused element (Horizontal Tabs 2 (tab group) "Tab 2" Tab Control) and pressed DOWN ARROW twice', () => {
    before(() => {
      // Act
      cy.focused()
        .tab()
        .tab()
        .tab()
        .type('{downarrow}{downarrow}')
    })

    it('should url and history updated with previous state which included activated tabs from all other tab groups in the page', () => {
      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3')
          expect(loc.hash).to.eq('#vertical-tabs-1')
        })
    })

    it('should Horizontal Tabs 1 (tab group) selected tab activated', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })
    })

    it('should Horizontal Tabs 2 (tab group) selected tab activated', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-2',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
        tabControlText: 'Tab 2'
      })
    })

    it('should Vertical Tabs 1 (tab group) tab activated successfully', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-3',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })
    })

    it('should Vertical Tabs 2 (tab group) remain default unchanged', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-2',
        tabPanelId: 'tab-panel-2',
        tabControlText: 'No title tab'
      })
    })
  })

  context('When Vertical Tabs 2 (tab group) 2nd (from top) Tab Control (button) is clicked and activated', () => {
    before(() => {
      // Act
      cy.get('#tabs-1 .tab-list')
        .find('.tab-control')
        .eq(1)
        .click()
    })

    it('should url and history updated with dynamic generated id (for no id provided tabs) and previous state which included activated tabs from all other tab groups in the page', () => {
      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3&tabs-1=tab-control-3')
          expect(loc.hash).to.eq('#tabs-1')
        })
    })

    it('should Horizontal Tabs 1 (tab group) previous state retained', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })
    })

    it('should Horizontal Tabs 2 (tab group) previous state retained', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-2',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
        tabControlText: 'Tab 2'
      })
    })

    it('should Vertical Tabs 1 (tab group) previous state retained', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-3',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })
    })

    it('should Vertical Tabs 2 (tab group) tab activated successfully', () => {
      // Assert
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-3',
        tabPanelId: 'tab-panel-3',
        tabControlText: 'No title tab'
      })
    })
  })

  context('When navigate back or forward between browser history', () => {
    it('should all activated tabs and url render correctly when go back once', () => {
      // Act
      cy.go('back')

      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3')
          expect(loc.hash).to.eq('#vertical-tabs-1')
        })

      // Horizontal Tabs 1 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })

      // Horizontal Tabs 2 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-2',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
        tabControlText: 'Tab 2'
      })

      // Vertical Tabs 1 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-3',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })

      // Vertical Tabs 2 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-2',
        tabPanelId: 'tab-panel-2',
        tabControlText: 'No title tab'
      })
    })

    it('should all activated tabs and url render correctly when go back again', () => {
      // Act
      cy.go('back')

      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-2')
          expect(loc.hash).to.eq('#vertical-tabs-1')
        })

      // Horizontal Tabs 1 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })

      // Horizontal Tabs 2 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-2',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
        tabControlText: 'Tab 2'
      })

      // Vertical Tabs 1 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-2',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-2',
        tabControlText: 'Tab 2'
      })

      // Vertical Tabs 2 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-2',
        tabPanelId: 'tab-panel-2',
        tabControlText: 'No title tab'
      })
    })

    it('should all activated tabs and url render correctly when go forward twice', () => {
      // Act
      cy.go('forward')
        .go('forward')

      // Assert
      cy.location()
        .should((loc) => {
          expect(loc.search).to.eq('?horizontal-tabs-1=tab-control-horizontal-tabs-1-item-3&horizontal-tabs-2=tab-control-horizontal-tabs-2-item-2&vertical-tabs-1=tab-control-vertical-tabs-1-item-3&tabs-1=tab-control-3')
          expect(loc.hash).to.eq('#tabs-1')
        })

      // Horizontal Tabs 1 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#horizontal-tabs-1',
        tabControlId: 'tab-control-horizontal-tabs-1-item-3',
        tabPanelId: 'tab-panel-horizontal-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })

      // Horizontal Tabs 2 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 2,
        contextSelector: '#horizontal-tabs-2',
        tabControlId: 'tab-control-horizontal-tabs-2-item-2',
        tabPanelId: 'tab-panel-horizontal-tabs-2-item-2',
        tabControlText: 'Tab 2'
      })

      // Vertical Tabs 1 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#vertical-tabs-1',
        tabControlId: 'tab-control-vertical-tabs-1-item-3',
        tabPanelId: 'tab-panel-vertical-tabs-1-item-3',
        tabControlText: 'Tab 3'
      })

      // Vertical Tabs 2 (tab group)
      expectSelectedTabIsActiveWhileOthersNot({
        totalItems: 3,
        contextSelector: '#tabs-1',
        tabControlId: 'tab-control-3',
        tabPanelId: 'tab-panel-3',
        tabControlText: 'No title tab'
      })
    })
  })
})
