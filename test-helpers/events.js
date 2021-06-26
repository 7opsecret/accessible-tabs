export const fireKeyUpEvent = (
  contextEl = document,
  KeyboardEventInit
) => {
  const keyboardEvent = new KeyboardEvent('keyup', KeyboardEventInit)
  contextEl.dispatchEvent(keyboardEvent)
}

export const fireKeyDownEvent = (
  contextEl = document,
  KeyboardEventInit
) => {
  const keyboardEvent = new KeyboardEvent('keydown', KeyboardEventInit)
  contextEl.dispatchEvent(keyboardEvent)
}
