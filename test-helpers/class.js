export const createClassInstance = (Klass, ...args) => () => new Klass(...args)
