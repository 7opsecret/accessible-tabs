module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '\\.css$': '<rootDir>/__mocks__/styleMock.js'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/dist/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  coveragePathIgnorePatterns: [
    '/enums/'
  ]
}
