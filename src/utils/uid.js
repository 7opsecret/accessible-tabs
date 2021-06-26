const _uid = () => {
  let counter = 0
  return () => ++counter
}

export const uid = _uid()
