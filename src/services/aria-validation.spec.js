import { AriaValidationService } from './aria-validation';

describe('Service: AriaValidationService', () => {
    it.each`
    maybeMatchValue   | expected
    ${ 'vertical' }   | ${true}
    ${ 'horizontal' } | ${true}
    ${ 'HoRiZoNtAL' } | ${true}
    ${ 'flipped' }    | ${false}
    `('should #isValidOrientation return $expected when value is $maybeMatchValue', ({
        maybeMatchValue,
        expected
    }) => {
        // Act
        const received = AriaValidationService.isValidOrientation(maybeMatchValue);

        // Assert
        expect(received).toBe(expected);
    });
});