import { assertHtmlElement } from './assert-htmlelement'

describe('Exceptions:', () => {
  it('should #assertHtmlElement throw a default error message when call without any payload', () => {
    // Arrange
    const fnToAssert = () => assertHtmlElement()

    // Assert
    expect(fnToAssert).toThrow('Invalid HTMLElement')
  })

  it('should #assertHtmlElement throw a default error message when call with payload not a HTMLElement', () => {
    // Arrange
    const fnToAssert = () => assertHtmlElement(() => {})

    // Assert
    expect(fnToAssert).toThrow('Invalid HTMLElement')
  })

  it('should #assertHtmlElement throw a custom error message when call with payload not a HTMLElement', () => {
    // Arrange
    const fnToAssert = () => assertHtmlElement('<p>paragraph</p>', '[Component Context] Custom Error Message')

    // Assert
    expect(fnToAssert).toThrow('[Component Context] Custom Error Message')
  })

  it('should #assertHtmlElement not throw when a HTMLElement is provided', () => {
    // Arrange
    const fnToAssert = () => assertHtmlElement(document.createElement('div'))

    // Assert
    expect(fnToAssert).not.toThrow()
  })
})
