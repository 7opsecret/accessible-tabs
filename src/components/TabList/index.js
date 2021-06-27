// Stylesheet(s):
import './styles.css'

// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement'

// Service(s):
import { AriaValidationService } from '~/src/services/aria-validation'

// Util(s):
import { setAttributes } from '~/src/utils/dom'

// Local Config(s):
export const TAB_CONTROL_BASE_CLASSNAME = 'tab-list'

export default class TabList {
  constructor (
    element,
    {
      ariaLabel,
      ariaOrientation
    } = {}
  ) {
    assertHtmlElement(element, '[TabList] Invalid HTML Element (args[0])')

    this.element = element
    this.ariaLabel = ariaLabel
    this.ariaOrientation = AriaValidationService.returnValidOrientation(ariaOrientation)

    this.mount()
  }

  mount () {
    this.setDefaultCssClasses()
    this.setA11yAttributes()
  }

  setDefaultCssClasses () {
    this.element.classList.add(
      TAB_CONTROL_BASE_CLASSNAME,
      TAB_CONTROL_BASE_CLASSNAME + '--' + this.ariaOrientation
    )
  }

  setA11yAttributes () {
    setAttributes(
      this.element,
      {
        role: 'tablist',
        'aria-orientation': this.ariaOrientation,
        ...this.ariaLabel && { 'aria-label': this.ariaLabel }
      }
    )
  }
}
