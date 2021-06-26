import { setAttributes } from './dom';

describe('Utils: dom', () => {
    describe('#setAttributes', () => {
        it('should set attributes to element correctly', () => {
            // Arrange
            const mockEl = document.createElement('div');

            // Act
            setAttributes(
                mockEl,
                {
                    'aria-labelledby': 'fake-id',
                    role: 'tabpanel',
                    tabindex: '0'
                }
            );

            // Assert
            expect(mockEl.outerHTML).toMatchSnapshot();
        });

        it('should throw error if 1st arg not a valid HTMLElement', () => {
            const fnToAssert = () => setAttributes(
                false,
                {
                    'aria-labelledby': 'fake-id',
                    role: 'tabpanel',
                    tabindex: '0'
                }
            );

            expect(fnToAssert).toThrow('[setAttributes] Invalid HTML Element (args[0])');
        });
    });
});