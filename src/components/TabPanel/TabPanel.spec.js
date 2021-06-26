import TabPanel from '.'

describe('Component: TabPanel', () => {
  const initTabPanel = (...args) => () => new TabPanel(args)
  let panelEl

  beforeEach(() => {
    panelEl = document.createElement('div')
  })

  it('should throw error if "TabPanel" created without valid "element" payload', () => {
    // Assert
    expect(initTabPanel()).toThrow('[TabPanel] Invalid HTML Element (args[0])')
  })

  it('should element attributes changed as expected when instance selected state is updated', () => {
    // Arrange
    const tabPanel = new TabPanel(panelEl)

    tabPanel.selected = true

    // Assert
    expect(tabPanel.element.className).toBe('tab-panel tab-panel--selected')
    expect(tabPanel.element.getAttribute('hidden')).toBeNull()

    // Act
    tabPanel.selected = false

    // Assert
    expect(tabPanel.element.className).toBe('tab-panel')
    expect(tabPanel.element.getAttribute('hidden')).toBe('')
  })

  describe('When "defaultSelected" is true', () => {
    let tabPanel

    beforeAll(() => {
      tabPanel = new TabPanel(
        panelEl,
        {
          id: 'tab-panel-1',
          associateId: 'tab-control-1',
          defaultSelected: true
        }
      )
    })

    it('should render class name correctly when created', () => {
      // Assert
      expect(tabPanel.element.className).toBe('tab-panel tab-panel--selected')
    })

    it('should element attributes set correctly', () => {
      // Assert
      expect(tabPanel.element.id).toBe('tab-panel-1')
      expect(tabPanel.element.getAttribute('role')).toBe('tabpanel')
      expect(tabPanel.element.getAttribute('tabindex')).toBe('0')
      expect(tabPanel.element.getAttribute('aria-labelledby')).toBe('tab-control-1')
      expect(tabPanel.element.getAttribute('hidden')).toBeNull()
    })
  })

  describe('When "defaultSelected" is falsey', () => {
    it('should render class name correctly when created', () => {
      // Arrange
      const tabPanel = new TabPanel(
        panelEl
      )

      // Assert
      expect(tabPanel.element.className).toBe('tab-panel')
    })

    it('should element attributes set correctly', () => {
      // Arrange
      const tabPanel = new TabPanel(
        panelEl,
        {
          id: 'tab-panel-1',
          associateId: 'tab-control-1'
        }
      )

      // Assert
      expect(tabPanel.element.id).toBe('tab-panel-1')
      expect(tabPanel.element.getAttribute('role')).toBe('tabpanel')
      expect(tabPanel.element.getAttribute('tabindex')).toBe('0')
      expect(tabPanel.element.getAttribute('aria-labelledby')).toBe('tab-control-1')
      expect(tabPanel.element.getAttribute('hidden')).toBe('')
    })
  })
})
