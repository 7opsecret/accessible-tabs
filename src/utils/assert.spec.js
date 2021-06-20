import { isFunction } from './assert';

describe('Utils: validate', () => {
    describe('#isFunction', () => {
        it.each`
        maybeFunction    | expected
        ${() => {}}      | ${true}
        ${function() {}} | ${true}
        ${[]}            | ${false}
        ${null}          | ${false}
        ${undefined}     | ${false}
        `('should return $expected when value is $maybeFunction', ({
            maybeFunction,
            expected
        }) => {
            const received = isFunction(maybeFunction);

            expect(received).toBe(expected);
        });
    });
});