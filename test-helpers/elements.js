export const getSelectedAttributesFromElement = (element, attributes) => attributes.reduce(
  (acc, attribute) => {
    return {
      ...acc,
      [attribute]: element.getAttribute(attribute)
    }
  }
  , {}
)

export const getSelectedAttributesFromElements = (elements, attributes) => [...elements].map(
  (element) => getSelectedAttributesFromElement(element, attributes)
)
