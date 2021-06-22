import { fireKeyUpEvent } from '~/test-helpers/events';
import TabControl from '.';

describe('Component: TabControl', () => {
    const initTabControl = (...args) => () => new TabControl(args);
    const WITH_DEFAULT_SELECTED_OPTIONS = {
        associateId: 'tab-Control-1',
        defaultSelected: true,
        id: 'tab-control-1',
        title: 'Tab title 1',
    };
    const WITHOUT_DEFAULT_SELECTED_OPTIONS = {
        associateId: 'tab-Control-1',
        id: 'tab-control-1',
        title: 'Tab title 1'
    };
    let controlEl;

    beforeEach(() => {
        controlEl = document.createElement('button');
    });

    it('should throw error if "TabControl" created without valid "element" payload', () => {
        // Assert
        expect(initTabControl()).toThrow('[TabControl] Invalid HTML Element (args[0])');
    });

    it('should element attributes changed as expected when instance selected state is updated', () => {
        // Arrange
        const tabControl = new TabControl(controlEl);

        // Act
        tabControl.selected = true;

        // Assert
        expect(tabControl.element.className).toBe('tab-control tab-control--selected');
        expect(tabControl.element.getAttribute('tabindex')).toBe('0');
        expect(tabControl.element.getAttribute('aria-selected')).toBe('true');

        // Act
        tabControl.selected = false;

        // Assert
        expect(tabControl.element.className).toBe('tab-control');
        expect(tabControl.element.getAttribute('tabindex')).toBe('-1');
        expect(tabControl.element.getAttribute('aria-selected')).toBe('false');
    });

    it('should onClick handler binded and fired when clicked', () => {
        // Arrange
        const mockOnClick = jest.fn();
        const tabControl = new TabControl(
            controlEl,
            {
                onClick: mockOnClick
            }
        );

        tabControl.element.click();

        // Assert
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should onKeyUp handler binded and fired when any key up', () => {
        // Arrange
        const mockOnKeyUp = jest.fn();
        const tabControl = new TabControl(
            controlEl,
            {
                onKeyUp: mockOnKeyUp
            }
        );

        // Act
        fireKeyUpEvent(tabControl.element);

        // Assert
        expect(mockOnKeyUp).toHaveBeenCalledTimes(1);
    });

    it('should onFocus handler binded and fired when focus is set', () => {
        // Arrange
        const mockOnFocus = jest.fn();
        const tabControl = new TabControl(
            controlEl,
            {
                onFocus: mockOnFocus
            }
        );
        // Note: Focus won't work if element not in document body
        document.body.appendChild(tabControl.element);

        // Act
        tabControl.element.focus();

        // Assert
        expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    describe('When "defaultSelected" is true', () => {
        let tabControl;

        beforeAll(() => {
            tabControl = new TabControl(
                controlEl,
                WITH_DEFAULT_SELECTED_OPTIONS
            );
        });

        it('should render class name correctly', () => {
            // Assert
            expect(tabControl.element.className).toBe('tab-control tab-control--selected');
        });

        it('should element attributes set correctly', () => {
            // Assert
            expect(tabControl.element.id).toBe('tab-control-1');
            expect(tabControl.element.getAttribute('role')).toBe('tab');
            expect(tabControl.element.getAttribute('tabindex')).toBe('0');
            expect(tabControl.element.getAttribute('aria-controls')).toBe('tab-Control-1');
            expect(tabControl.element.getAttribute('aria-selected')).toBe('true');
        });
    });

    describe('When "defaultSelected" is false', () => {
        it('should render class name correctly when created', () => {
            // Arrange
            const tabControl = new TabControl(
                controlEl
            );

            // Assert
            expect(tabControl.element.className).toBe('tab-control');
        });

        it('should element attributes set correctly', () => {
            // Arrange
            const tabControl = new TabControl(
                controlEl,
                WITHOUT_DEFAULT_SELECTED_OPTIONS
            );

            // Assert
            expect(tabControl.element.id).toBe('tab-control-1');
            expect(tabControl.element.getAttribute('role')).toBe('tab');
            expect(tabControl.element.getAttribute('tabindex')).toBe('-1');
            expect(tabControl.element.getAttribute('aria-controls')).toBe('tab-Control-1');
            expect(tabControl.element.getAttribute('aria-selected')).toBe('false');
        });
    });
});