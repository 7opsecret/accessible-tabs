export const isFunction = (maybeFunction) => typeof maybeFunction === 'function'

export const isArray = Array.isArray;

export const isStringMatchedList = (matchList = []) =>
    (maybeMatchValue) => matchList?.some?.((match) => match?.toLowerCase?.() === maybeMatchValue?.toLowerCase?.())