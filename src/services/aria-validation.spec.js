import { AriaValidationService } from './aria-validation'

describe('Service: AriaValidationService', () => {
  it.each`
    maybeValidOrientation | expected
    ${'VERTICAL'}         | ${'vertical'}
    ${'vertical'}         | ${'vertical'}
    ${'horizontal'}       | ${'horizontal'}
    ${'HoRiZoNtAL'}       | ${'horizontal'}
    ${'flipped'}          | ${'horizontal'}
    ${true}               | ${'horizontal'}
    ${false}              | ${'horizontal'}
    ${0}                  | ${'horizontal'}
    ${1}                  | ${'horizontal'}
    ${null}               | ${'horizontal'}
    `('should #returnValidOrientation return $expected when value is $maybeValidOrientation', ({
    maybeValidOrientation,
    expected
  }) => {
    // Act
    const received = AriaValidationService.returnValidOrientation(maybeValidOrientation)

    // Assert
    expect(received).toBe(expected)
  })
})
