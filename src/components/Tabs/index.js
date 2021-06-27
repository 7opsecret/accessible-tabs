// Stylesheet(s):
import './styles.css'

// Service(s):
import { ActivatedTabsHistoryService } from '~/src/services/activated-tabs-history'
import { AriaValidationService } from '~/src/services/aria-validation'
import { TabItemsService } from '~/src/services/tab-items'

// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement'

// Component(s):
import TabControl, { TAB_CONTROL_BASE_CLASSNAME } from '~/src/components/TabControl'
import TabList from '~/src/components/TabList'
import TabPanel, { TAB_PANEL_BASE_CLASSNAME } from '~/src/components/TabPanel'

// Enum(s):
import { ARIA_ORIENTATION } from '~/src/enums/aria-values'
import { KEY, DIRECTION } from '~/src/enums/key-code'

// Util(s):
import { uid } from '~/src/utils/uid'

// Local Config(s):
const TABS_BASE_CLASSNAME = 'tabs'
const PANEL_CSS_SELECTOR = 'js-tab-panel'

export default class Tabs {
  constructor (
    element,
    {
      orientation
    } = {}
  ) {
    assertHtmlElement(element, '[Tabs] Invalid HTML Element (args[0])')
    const panelEls = element.getElementsByClassName(PANEL_CSS_SELECTOR)
    if (!panelEls.length) return // Silently bailed if no panels found

    this.element = element
    this.panelEls = panelEls
    this.tabItemsService = null
    this.tabList = null
    this.tabsId = element.id || `tabs-${uid()}`
    this.orientation = AriaValidationService.returnValidOrientation(orientation) // fallback to horizontal if invalid
    this.isVerticalOrientation = this.orientation === ARIA_ORIENTATION.VERTICAL

    this.mount()
  }

  mount () {
    if (!this.element.id) {
      this.element.id = this.tabsId
    }
    this.tabItemsService = new TabItemsService()
    this.tabList = new TabList(
      document.createElement('div'),
      {
        ariaLabel: this.element.dataset.tablistLabel,
        ariaOrientation: this.orientation
      }
    )
    this.setDefaultCssClasses()
    this.setupPanelsAndControls()
    this.subscribeHistoryService()
    this.syncStateFromSearchParams()
  }

  subscribeHistoryService () {
    const firstTabItem = this.tabItemsService.findChildByIndex(0)
    ActivatedTabsHistoryService.mount({
      tabsId: this.tabsId,
      uiUpdaterCallback: this.selectNextTabByControl.bind(this),
      popStateFallbackState: {
        id: firstTabItem.tabControl.id,
        associateId: firstTabItem.tabPanel.id
      }
    })
  }

  syncStateFromSearchParams () {
    const potentialControlId = new URLSearchParams(window.location.search).get(this.tabsId)
    const tabControlInstance = this.tabItemsService.findChildByTabControlId(potentialControlId)?.tabControl
    if (!tabControlInstance) return
    this.selectNextTabByControl(tabControlInstance)
    ActivatedTabsHistoryService.replaceState({
      [this.tabsId]: {
        id: tabControlInstance.id,
        associateId: tabControlInstance.associateId
      }
    })
  }

  setDefaultCssClasses () {
    this.element.classList.add(
      TABS_BASE_CLASSNAME,
      TABS_BASE_CLASSNAME + '--' + this.orientation
    )
  }

  setupPanelsAndControls () {
    const tabControlsFragment = new DocumentFragment();

    [...this.panelEls].forEach((panelEl, index) => {
      const id = panelEl.id || uid()
      const defaultSelected = index === 0
      const tabControlId = `${TAB_CONTROL_BASE_CLASSNAME}-${id}`
      const tabPanelId = `${TAB_PANEL_BASE_CLASSNAME}-${id}`
      const tabTitle = panelEl.dataset.tabTitle || 'No title tab'

      // Instance Options:
      const tabPanelOptions = {
        defaultSelected,
        associateId: tabControlId,
        id: tabPanelId
      }
      const tabControlOptions = {
        associateId: tabPanelId,
        defaultSelected,
        id: tabControlId,
        onClick: this.handleTabControlClick,
        onKeyUp: this.handleTabControlKeyUp,
        onKeyDown: this.handleTabControlKeyDown,
        title: tabTitle
      }

      const tabControl = new TabControl(document.createElement('div'), tabControlOptions)
      const tabPanel = new TabPanel(panelEl, tabPanelOptions)
      this.tabItemsService.addChild({ tabControl, tabPanel })
      tabControlsFragment.appendChild(tabControl.element)
    })

    this.renderTabControls(tabControlsFragment)
  }

  renderTabControls (tabControlsFragment) {
    this.tabList.element.appendChild(tabControlsFragment)
    this.element.insertBefore(this.tabList.element, this.element.firstChild)
  }

  activateSelectedTabControl (selectedTabControl) {
    this.selectNextTabByControl(selectedTabControl)

    ActivatedTabsHistoryService.save({
      tabsId: this.tabsId,
      selectedTabState: {
        id: selectedTabControl.id,
        associateId: selectedTabControl.associateId
      }
    })
  }

  selectNextTabByControl (nextTabControl) {
    this.tabItemsService.forEach(({
      tabPanel,
      tabControl
    }) => {
      tabPanel.selected = tabPanel.id === nextTabControl.associateId
      tabControl.selected = tabControl.id === nextTabControl.id
    })
  }

  setFocusOnNextControlByDirection (e, directionKeyCode) {
    const currentTabControlIndex = this.tabItemsService.findChildIndexByTabControlId(e.currentTarget.id)
    const nextIndex = DIRECTION[directionKeyCode] + currentTabControlIndex
    this.setFocusOnNextControlByIndex(nextIndex)
  }

  setFocusOnNextControlByIndex (nextIndex) {
    const lastIndex = this.tabItemsService.lastChildIndex
    let _nextIndex = nextIndex

    if (_nextIndex < 0) {
      _nextIndex = lastIndex
    }

    if (_nextIndex > lastIndex) {
      _nextIndex = 0
    }

    const selectedTabControl = this.tabItemsService.findChildByIndex(_nextIndex).tabControl

    if (selectedTabControl) {
      this.activateSelectedTabControl(selectedTabControl)
      selectedTabControl.element.focus()
    }
  }

  handleVerticalOrientationTabControlKeyUp (e) {
    switch (e.keyCode) {
      case KEY.UP:
        this.setFocusOnNextControlByDirection(e, KEY.UP)
        break

      case KEY.DOWN:
        this.setFocusOnNextControlByDirection(e, KEY.DOWN)
        break

      case KEY.HOME:
        this.setFocusOnNextControlByIndex(0)
        break

      case KEY.END:
        this.setFocusOnNextControlByIndex(this.tabItemsService.lastChildIndex)
        break
    }
  }

  handleHorizontalOrientationTabControlKeyUp (e) {
    switch (e.keyCode) {
      case KEY.LEFT:
        this.setFocusOnNextControlByDirection(e, KEY.LEFT)
        break

      case KEY.RIGHT:
        this.setFocusOnNextControlByDirection(e, KEY.RIGHT)
        break

      case KEY.HOME:
        this.setFocusOnNextControlByIndex(0)
        break

      case KEY.END:
        this.setFocusOnNextControlByIndex(this.tabItemsService.lastChildIndex)
        break
    }
  }

  handleTabControlKeyUp = (e) => {
    this.isVerticalOrientation
      ? this.handleVerticalOrientationTabControlKeyUp(e)
      : this.handleHorizontalOrientationTabControlKeyUp(e)
  }

  handleTabControlKeyDown = (e) => {
    if (this.isVerticalOrientation) {
      switch (e.keyCode) {
        case KEY.UP:
        case KEY.DOWN:
          e.preventDefault()
      }
    }

    switch (e.keyCode) {
      case KEY.HOME:
      case KEY.END:
        e.preventDefault()
    }
  }

  handleTabControlClick = (e) => {
    const selectedTabControl = this.tabItemsService.findChildByTabControlId(e.currentTarget.id)?.tabControl
    this.activateSelectedTabControl(selectedTabControl)
  }
}
