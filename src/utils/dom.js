export const setAttributes = (element, attributes) => {
    for(let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
}