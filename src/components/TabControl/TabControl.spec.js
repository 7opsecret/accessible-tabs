import TabControl from '.'

// Test Helper(s):
import { fireKeyUpEvent, fireKeyDownEvent } from '~/test-helpers/events'
import { createClassInstance } from '~/test-helpers/class'

describe('Component: TabControl', () => {
  let controlEl

  beforeEach(() => {
    controlEl = document.createElement('button')
  })

  it('should throw error if "TabControl" created without valid "element" payload', () => {
    // Assert
    expect(createClassInstance(TabControl)).toThrow('[TabControl] Invalid HTML Element (args[0])')
  })

  it('should element attributes changed as expected when instance selected state is updated', () => {
    // Arrange
    const tabControl = new TabControl(controlEl)

    // Act
    tabControl.selected = true

    // Assert
    expect(tabControl.element.className).toBe('tab-control tab-control--selected')
    expect(tabControl.element.getAttribute('tabindex')).toBe('0')
    expect(tabControl.element.getAttribute('aria-selected')).toBe('true')

    // Act
    tabControl.selected = false

    // Assert
    expect(tabControl.element.className).toBe('tab-control')
    expect(tabControl.element.getAttribute('tabindex')).toBe('-1')
    expect(tabControl.element.getAttribute('aria-selected')).toBe('false')
  })

  it('should onClick handler binded and fired when clicked', () => {
    // Arrange
    const mockOnClick = jest.fn()
    const tabControl = new TabControl(
      controlEl,
      {
        onClick: mockOnClick
      }
    )

    tabControl.element.click()

    // Assert
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should onKeyUp handler binded and fired when any key up', () => {
    // Arrange
    const mockOnKeyUp = jest.fn()
    const tabControl = new TabControl(
      controlEl,
      {
        onKeyUp: mockOnKeyUp
      }
    )

    // Act
    fireKeyUpEvent(tabControl.element)

    // Assert
    expect(mockOnKeyUp).toHaveBeenCalledTimes(1)
  })

  it('should onKeyDown handler binded and fired when any key down', () => {
    // Arrange
    const mockOnKeyDown = jest.fn()
    const tabControl = new TabControl(
      controlEl,
      {
        onKeyDown: mockOnKeyDown
      }
    )

    // Act
    fireKeyDownEvent(tabControl.element)

    // Assert
    expect(mockOnKeyDown).toHaveBeenCalledTimes(1)
  })

  describe('When "defaultSelected" is true', () => {
    let tabControl

    beforeAll(() => {
      tabControl = new TabControl(
        controlEl,
        {
          associateId: 'tab-Control-1',
          defaultSelected: true,
          id: 'tab-control-1',
          title: 'Tab title 1'
        }
      )
    })

    it('should render class name correctly', () => {
      // Assert
      expect(tabControl.element.className).toBe('tab-control tab-control--selected')
    })

    it('should element attributes set correctly', () => {
      // Assert
      expect(tabControl.element.id).toBe('tab-control-1')
      expect(tabControl.element.getAttribute('role')).toBe('tab')
      expect(tabControl.element.getAttribute('tabindex')).toBe('0')
      expect(tabControl.element.getAttribute('aria-controls')).toBe('tab-Control-1')
      expect(tabControl.element.getAttribute('aria-selected')).toBe('true')
    })
  })

  describe('When "defaultSelected" is falsey', () => {
    it('should render class name correctly when created', () => {
      // Arrange
      const tabControl = new TabControl(
        controlEl
      )

      // Assert
      expect(tabControl.element.className).toBe('tab-control')
    })

    it('should element attributes set correctly', () => {
      // Arrange
      const tabControl = new TabControl(
        controlEl,
        {
          associateId: 'tab-Control-1',
          id: 'tab-control-1',
          title: 'Tab title 1'
        }
      )

      // Assert
      expect(tabControl.element.id).toBe('tab-control-1')
      expect(tabControl.element.getAttribute('role')).toBe('tab')
      expect(tabControl.element.getAttribute('tabindex')).toBe('-1')
      expect(tabControl.element.getAttribute('aria-controls')).toBe('tab-Control-1')
      expect(tabControl.element.getAttribute('aria-selected')).toBe('false')
    })
  })
})
