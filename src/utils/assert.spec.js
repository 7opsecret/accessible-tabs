import {
    isArray,
    isFunction,
    isStringMatchedList
} from './assert';

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

    describe('#isStringMatchedList', () => {
        it.each`
        maybeMatchValue      | expected
        ${ 'Accessible' }    | ${true}
        ${ 'accessible' }    | ${true}
        ${ 'User friendly' } | ${true}
        ${ 'user Friendly' } | ${true}
        ${ 'User-friendly' } | ${false}
        ${ 'Userfriendly' }  | ${false}
        `('should return $expected when $maybeMatchValue is one of mocked match list - [ "accessible", "User friendly" ]', ({
            maybeMatchValue,
            expected
        }) => {
            // Arrange
            const mockedMatchList = [ 'accessible', 'User friendly' ];

            // Act
            const received = isStringMatchedList(mockedMatchList)(maybeMatchValue);

            // Assert
            expect(received).toBe(expected);
        });
    });
});