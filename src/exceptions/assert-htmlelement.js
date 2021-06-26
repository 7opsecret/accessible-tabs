export const assertHtmlElement = (
  maybeElement,
  errorMessage = 'Invalid HTMLElement'
) => {
  if (!(maybeElement instanceof HTMLElement)) {
    throw new Error(errorMessage)
  }
}
