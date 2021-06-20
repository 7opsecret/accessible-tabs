export const fireKeyUpEvent = (
    contextEl = document,
    KeyboardEventInit
) => {
    const keyboardEvent = new KeyboardEvent('keyup', KeyboardEventInit)
    contextEl.dispatchEvent(keyboardEvent);
}