module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '\\.css$': '<rootDir>/__mocks__/styleMock.js'
    }
}