// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement'

export const setAttributes = (element, attributes) => {
  assertHtmlElement(element, '[setAttributes] Invalid HTML Element (args[0])')

  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}
