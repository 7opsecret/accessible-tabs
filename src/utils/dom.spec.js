import { setAttributes } from './dom';

describe('Utils: dom', () => {
    describe('#setAttributes', () => {
        it('should set attributes to element correctly', () => {
            const mockEl = document.createElement('div');

            setAttributes(
                mockEl,
                {
                    'aria-labelledby': 'fake-id',
                    role: 'tabpanel',
                    tabindex: '0'
                }
            );

            expect(mockEl.outerHTML).toMatchSnapshot();
        });
    });
});