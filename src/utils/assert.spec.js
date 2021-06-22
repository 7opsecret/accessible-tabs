import { isArray, isFunction } from './assert';

describe('Utils: validate', () => {
    describe('#isFunction', () => {
        it.each`
        maybeFunction    | expected
        ${() => { }}      | ${true}
        ${function () { }} | ${true}
        ${[]}            | ${false}
        ${null}          | ${false}
        ${undefined}     | ${false}
        `('should return $expected when value is $maybeFunction', ({
            maybeFunction,
            expected
        }) => {
            // Act
            const received = isFunction(maybeFunction);

            // Assert
            expect(received).toBe(expected);
        });
    });

    describe('#isArray', () => {
        it.each`
        maybeArray      | expected
        ${new Array()}  | ${true}
        ${[]}           | ${true}
        ${new Map()}    | ${false}
        ${new Set()}    | ${false}
        ${'array'}      | ${false}
        `('should return $expected when value is $maybeArray', ({
            maybeArray,
            expected
        }) => {
            // Act
            const received = isArray(maybeArray);

            // Assert
            expect(received).toBe(expected);
        });
    });
});