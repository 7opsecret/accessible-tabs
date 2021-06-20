import { expect } from '@jest/globals';
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
        expect(initTabControl()).toThrow('[TabControl] Invalid HTML Element (args[0])');
    });

    it('should render class name correctly when created with "defaultSelected" is false', () => {
        const tabControl = new TabControl(
            controlEl
        );

        expect(tabControl.element.className).toBe('tab-control');
    });

    it('should render class name correctly when created with "defaultSelected" is true', () => {
        const tabControl = new TabControl(
            controlEl,
            WITH_DEFAULT_SELECTED_OPTIONS
        );

        expect(tabControl.element.className).toBe('tab-control tab-control--selected');
    });

    it('should element attributes set correctly with "defaultSelected" is true', () => {
        const tabControl = new TabControl(
            controlEl,
            WITH_DEFAULT_SELECTED_OPTIONS
        );

        expect(tabControl.element.id).toBe('tab-control-1');
        expect(tabControl.element.getAttribute('role')).toBe('tab');
        expect(tabControl.element.getAttribute('tabindex')).toBe('0');
        expect(tabControl.element.getAttribute('aria-controls')).toBe('tab-Control-1');
        expect(tabControl.element.getAttribute('aria-selected')).toBe('true');
    });

    it('should element attributes set correctly with "defaultSelected" is false', () => {
        const tabControl = new TabControl(
            controlEl,
            WITHOUT_DEFAULT_SELECTED_OPTIONS
        );

        expect(tabControl.element.id).toBe('tab-control-1');
        expect(tabControl.element.getAttribute('role')).toBe('tab');
        expect(tabControl.element.getAttribute('tabindex')).toBe('-1');
        expect(tabControl.element.getAttribute('aria-controls')).toBe('tab-Control-1');
        expect(tabControl.element.getAttribute('aria-selected')).toBe('false');
    });

    it('should element attributes changed as expected when instance selected state is updated', () => {
        const tabControl = new TabControl(controlEl);

        tabControl.selected = true;

        expect(tabControl.element.className).toBe('tab-control tab-control--selected');
        expect(tabControl.element.getAttribute('tabindex')).toBe('0');

        tabControl.selected = false;

        expect(tabControl.element.className).toBe('tab-control');
        expect(tabControl.element.getAttribute('tabindex')).toBe('-1');
    });

    it('should onClick handler binded and fired when clicked', () => {
        const mockOnClick = jest.fn();
        const tabControl  = new TabControl(
            controlEl,
            {
                onClick: mockOnClick
            }
        );

        tabControl.element.click();

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});