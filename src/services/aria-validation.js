// Util(s):
import { isStringMatchedList } from '~/src/utils/assert'

// Enum(s):
import { ARIA_ORIENTATION } from '~/src/enums/aria-values'

export const AriaValidationService = (() => {
  const _isOrientationValid = isStringMatchedList([
    ARIA_ORIENTATION.VERTICAL,
    ARIA_ORIENTATION.HORIZONTAL
  ])

  const returnValidOrientation = (maybeValidOrientation) =>
    _isOrientationValid(maybeValidOrientation)
      ? maybeValidOrientation.toLowerCase()
      : ARIA_ORIENTATION.HORIZONTAL

  return {
    returnValidOrientation
  }
})()
