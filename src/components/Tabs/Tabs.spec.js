/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect","tab1KeyUpFiresTest"] }] */
// Component(s):
import Tabs from '.'

// Fixture(s):
import { tabsHtmlFixture } from '~/fixtures/tabs-html-fixture'

// Test Helper(s):
import { getSelectedAttributesFromElements } from '~/test-helpers/elements'
import { fireKeyUpEvent } from '~/test-helpers/events'
import { createClassInstance } from '~/test-helpers/class'

// Enum(s):
import { KEY } from '~/src/enums/key-code'

// Local Test Helper(s):
const createTestTabsAndPanels = (numberOfTabs, numberOfPanels = 3) => {
  return [...new Array(numberOfTabs)]
    .map((_tab, tabIndex) => tabsHtmlFixture({
      id: `tabs-${tabIndex + 1}`,
      heading: `Accessible Tab ${tabIndex + 1}`,
      tabListLabel: tabIndex === 0 ? 'Only first with tablist label' : '',
      panels: [...new Array(numberOfPanels)]
        .map((_panel, panelIndex) => ({
          id: `tab-${tabIndex}-panel-${panelIndex}`,
          dataTabTitle: `Tab ${tabIndex} - Panel ${panelIndex}`
        })
        )
    }))
    .join('')
}

const getTestAttributesFromTabsInstance = (tabsInstance) => {
  const tabControlEls = tabsInstance.element.getElementsByClassName('tab-control')
  const tabPanelsEls = tabsInstance.element.getElementsByClassName('js-tab-panel')
  const tabControlsAttributes = getSelectedAttributesFromElements(
    tabControlEls,
    ['aria-selected', 'class', 'tabindex']
  )
  const tabPanelsAttributes = getSelectedAttributesFromElements(
    tabPanelsEls,
    ['class', 'hidden']
  )

  return {
    tabControlsAttributes,
    tabPanelsAttributes
  }
}

const fireKeyUpEventViaSelectedControl = (
  tabsInstance,
  KeyboardEventInit
) => {
  fireKeyUpEvent(
    tabsInstance.element.querySelector('.tab-control--selected'),
    KeyboardEventInit
  )
}

const createExpectedAttributesBySelectedIndex = (totalItems, selectedIndex) => {
  const tabControlAttributes = {
    nonSelected: {
      'aria-selected': 'false',
      class: 'tab-control',
      tabindex: '-1'
    },
    selected: {
      'aria-selected': 'true',
      class: 'tab-control tab-control--selected',
      tabindex: '0'
    }
  }
  const tabPanelAttributes = {
    nonSelected: {
      class: 'js-tab-panel tab-panel',
      hidden: ''
    },
    selected: {
      class: 'js-tab-panel tab-panel tab-panel--selected',
      hidden: null
    }
  }

  const generateList = ({
    selected,
    nonSelected
  }) =>
    [...new Array(totalItems)]
      .map((_, index) => index === selectedIndex
        ? selected
        : nonSelected
      )

  return {
    expectedControlElsAttributes: generateList(tabControlAttributes),
    expectedPanelElsAttributes: generateList(tabPanelAttributes)
  }
}

const testKeyUpFiresByTabId = (totalItems, tabId) => ({
  keyCodesOrderToFire,
  expectedSelectedIndex,
  orientation = 'horizontal'
} = {}) => {
  // Act
  const tabs = new Tabs(document.getElementById(tabId), { orientation })
  keyCodesOrderToFire.forEach((keyCode) => {
    fireKeyUpEventViaSelectedControl(tabs, { keyCode })
  })

  // Assert
  const {
    tabControlsAttributes,
    tabPanelsAttributes
  } = getTestAttributesFromTabsInstance(tabs)
  const {
    expectedControlElsAttributes,
    expectedPanelElsAttributes
  } = createExpectedAttributesBySelectedIndex(totalItems, expectedSelectedIndex)
  const expectedSelectedTabControlId = tabs.element.querySelectorAll('.tab-control')[expectedSelectedIndex].id
  const expectedQueryString = `?${tabId}=${expectedSelectedTabControlId}`
  expect(tabControlsAttributes).toEqual(expectedControlElsAttributes)
  expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes)
  expect(window.location.hash).toBe(`#${tabId}`)
  expect(window.location.search).toBe(expectedQueryString)
}

describe('Component: Tabs', () => {
  const TOTAL_TEST_TAB_PANELS = 3
  const tab1KeyUpFiresTest = testKeyUpFiresByTabId(TOTAL_TEST_TAB_PANELS, 'tabs-1')

  beforeEach(() => {
    document.body.innerHTML = createTestTabsAndPanels(2, TOTAL_TEST_TAB_PANELS)
    history.replaceState({}, '', '/')
  })

  it('should throw error if "Tabs" created without valid "element" payload', () => {
    // Assert
    expect(createClassInstance(Tabs)).toThrow('[Tabs] Invalid HTML Element (args[0])')
  })

  it('should not throw error if creating instance with valid element but without any panels', () => {
    // Assert
    expect(createClassInstance(Tabs, document.createElement('div'))).not.toThrow()
  })

  it('should automatically assign an id to element when create instance with valid element without id that have at least one panel', () => {
    // Arrange
    const elementWithoutId = document.createElement('div')
    elementWithoutId.innerHTML = '<div class="js-tab-panel">panel sample</div>'

    // Act
    new Tabs(elementWithoutId) // eslint-disable-line no-new

    // Assert
    expect(elementWithoutId.id.startsWith('tabs-')).toBeTruthy()
  })

  it('should "tabs-1" have class "tabs tabs--horizontal"', () => {
    // Arrange
    const tabs1El = document.getElementById('tabs-1')

    // Act
    new Tabs(tabs1El) // eslint-disable-line no-new

    // Assert
    expect(tabs1El.className).toBe('tabs tabs--horizontal')
  })

  it('should "tabs-1" have class "tabs tabs--vertical" when "vertical" orientation options is specified', () => {
    // Arrange
    const tabs1El = document.getElementById('tabs-1')

    // Act
    new Tabs(tabs1El, { orientation: 'VERTICAL' }) // eslint-disable-line no-new

    // Assert
    expect(tabs1El.className).toBe('tabs tabs--vertical')
  })

  it('should "tabs-1" have class default to "tabs tabs--horizontal" when orientation value was invalid', () => {
    // Arrange
    const tabs1El = document.getElementById('tabs-1')

    // Act
    new Tabs(tabs1El, { orientation: 'vvertical' }) // eslint-disable-line no-new

    // Assert
    expect(tabs1El.className).toBe('tabs tabs--horizontal')
  })

  it('should multiple Tabs instances all have no duplicate id and associated correctly', () => {
    // Arrange
    const tabs1El = document.getElementById('tabs-1')
    const tabs2El = document.getElementById('tabs-2')

    // Act
    const tabs1 = new Tabs(tabs1El)
    const tabs2 = new Tabs(tabs2El)

    // Assert
    const allPanelEls = [
      ...tabs1.element.getElementsByClassName('js-tab-panel'),
      ...tabs2.element.getElementsByClassName('js-tab-panel')
    ]
    const allPanelElsId = allPanelEls.map(({ id }) => id)
    const allControlsIdFromPanelAssociatedId = allPanelEls.map((panelEl) => panelEl.getAttribute('aria-labelledby'))
    const totalPanelsUniqueId = new Set(allPanelElsId).size
    const expectedtotalPanelsIds = allPanelEls.length
    const allPanelsHaveAssociatedControl = allControlsIdFromPanelAssociatedId.every(controlId => {
      const controlEl = document.getElementById(controlId)
      const [, , ...id] = controlId.split('-')
      return controlEl.classList.contains('tab-control') &&
                controlEl.getAttribute('role') === 'tab' &&
                controlEl.getAttribute('aria-controls') === `tab-panel-${id.join('-')}`
    })

    expect(totalPanelsUniqueId).toBe(expectedtotalPanelsIds)
    expect(allPanelsHaveAssociatedControl).toBe(true)
  })

  it('should tablist element have "aria-label" when "data-tablist-label" is specified', () => {
    // Arrange
    const getTablistAriaLabel = (tabs) =>
      tabs.element
        .querySelector('.tab-list')
        .getAttribute('aria-label')
    const tabs1El = document.getElementById('tabs-1')
    const tabs2El = document.getElementById('tabs-2')

    // Act
    const tabs1 = new Tabs(tabs1El)
    const tabs2 = new Tabs(tabs2El)

    // Assert
    expect(getTablistAriaLabel(tabs1)).toBe('Only first with tablist label')
    expect(getTablistAriaLabel(tabs2)).toBeNull()
  })

  it('should click on 3rd tab control button toggle selected state correctly', () => {
    // Arrange
    const tabs1El = document.getElementById('tabs-1')
    const indexToSelect = 2

    // Act
    const tabs1 = new Tabs(tabs1El)
    const tabControlEls = tabs1.element.getElementsByClassName('tab-control')
    tabControlEls[indexToSelect].click()
    /**
         * Note:
         * For some reason JSDOM doesn't seems trigger focus on click.
         * Have tested by appending different elements into body (a, button, input)
         * but still no luck. This is a temporary solution to be investigate further
         * in the future.
         *
         * Important:
         * It has been tested on Safari, Edge, Chrome, Firefox cta click does trigger focus.
         * */
    tabControlEls[indexToSelect].focus()

    // Assert
    const {
      tabControlsAttributes,
      tabPanelsAttributes
    } = getTestAttributesFromTabsInstance(tabs1)
    const {
      expectedControlElsAttributes,
      expectedPanelElsAttributes
    } = createExpectedAttributesBySelectedIndex(TOTAL_TEST_TAB_PANELS, indexToSelect)
    const expectedQueryString = `?tabs-1=${tabControlEls[indexToSelect].id}`
    expect(tabControlsAttributes).toEqual(expectedControlElsAttributes)
    expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes)
    expect(window.location.hash).toBe('#tabs-1')
    expect(window.location.search).toBe(expectedQueryString)
  })

  it.each`
    orientation     | keyNameToVerify | keyCodesOrderToFire        | expectedSelectedIndex
    ${'horizontal'} | ${'Home'}       | ${[KEY.RIGHT, KEY.HOME]} | ${0}
    ${'horizontal'} | ${'End'}        | ${[KEY.END]}             | ${2}
    ${'horizontal'} | ${'Left'}       | ${[KEY.END, KEY.LEFT]}   | ${1}
    ${'horizontal'} | ${'Right'}      | ${[KEY.RIGHT]}           | ${1}
    ${'horizontal'} | ${'Up'}         | ${[KEY.LEFT, KEY.UP]}    | ${2}
    ${'horizontal'} | ${'Down'}       | ${[KEY.RIGHT, KEY.DOWN]} | ${1}
    ${'vertical'}   | ${'Home'}       | ${[KEY.DOWN, KEY.HOME]}  | ${0}
    ${'vertical'}   | ${'End'}        | ${[KEY.END]}             | ${2}
    ${'vertical'}   | ${'Left'}       | ${[KEY.END, KEY.LEFT]}   | ${2}
    ${'vertical'}   | ${'Right'}      | ${[KEY.UP, KEY.RIGHT]}   | ${2}
    ${'vertical'}   | ${'Up'}         | ${[KEY.UP, KEY.UP]}      | ${1}
    ${'vertical'}   | ${'Down'}       | ${[KEY.DOWN, KEY.DOWN]}  | ${2}
    `('should selected state render correctly when "$keyNameToVerify" key up event is fired when orientation is $orientation', tab1KeyUpFiresTest)

  it('should selected state render correctly when first element was selected and "Left" key up event is fired', () => {
    tab1KeyUpFiresTest({
      keyCodesOrderToFire: [KEY.LEFT],
      expectedSelectedIndex: 2
    })
  })

  it('should selected state render correctly when last element was selected and "Right" key up event is fired', () => {
    tab1KeyUpFiresTest({
      keyCodesOrderToFire: [KEY.END, KEY.RIGHT],
      expectedSelectedIndex: 0
    })
  })

  it('should selected state render correctly when multiple group tabs selected', () => {
    // Arrange
    const tabs1 = new Tabs(document.getElementById('tabs-1'))
    const tabs2 = new Tabs(document.getElementById('tabs-2'));

    // Act
    [
      KEY.END,
      KEY.LEFT
    ].forEach((keyCode) => {
      fireKeyUpEventViaSelectedControl(tabs1, { keyCode })
    });
    [
      KEY.LEFT
    ].forEach((keyCode) => {
      fireKeyUpEventViaSelectedControl(tabs2, { keyCode })
    })

    // Assert
    const expectedTab1Attributes = getTestAttributesFromTabsInstance(tabs1)
    const expectedTab1SelectedTabControlId = tabs1.element.querySelectorAll('.tab-control')[1].id
    const expectedTab2Attributes = getTestAttributesFromTabsInstance(tabs2)
    const expectedTab2SelectedTabControlId = tabs2.element.querySelectorAll('.tab-control')[2].id
    const receivedTab1Attributes = createExpectedAttributesBySelectedIndex(TOTAL_TEST_TAB_PANELS, 1)
    const receveidTab2Attributes = createExpectedAttributesBySelectedIndex(TOTAL_TEST_TAB_PANELS, 2)
    const expectedQueryString = `?tabs-1=${expectedTab1SelectedTabControlId}&tabs-2=${expectedTab2SelectedTabControlId}`
    expect(receivedTab1Attributes.tabControlsAttributes).toEqual(expectedTab1Attributes.expectedControlElsAttributes)
    expect(receivedTab1Attributes.tabPanelsAttributes).toEqual(expectedTab1Attributes.expectedPanelElsAttributes)
    expect(receveidTab2Attributes.tabControlsAttributes).toEqual(expectedTab2Attributes.expectedControlElsAttributes)
    expect(receveidTab2Attributes.tabPanelsAttributes).toEqual(expectedTab2Attributes.expectedPanelElsAttributes)
    expect(window.location.hash).toBe('#tabs-2')
    expect(window.location.search).toBe(expectedQueryString)
  })
})
