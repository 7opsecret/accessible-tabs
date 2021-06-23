import TabList from '.';

// Test Helper(s):
import { createClassInstance } from '~/test-helpers/class';

describe('Component: TabList', () => {
    let tabListEl;

    beforeEach(() => {
        tabListEl = document.createElement('div');
    });

    it('should throw error if "TabList" created without valid "element" payload', () => {
        // Assert
        expect(createClassInstance(TabList)).toThrow('[TabList] Invalid HTML Element (args[0])');
    });

    it('should default render correctly with expected attributes', () => {
        // Arrange
        const tabList = new TabList(tabListEl);

        // Assert
        expect(tabList.element.className).toBe('tab-list tab-list--horizontal');
        expect(tabList.element.getAttribute('aria-label')).toBeNull();
        expect(tabList.element.getAttribute('aria-orientation')).toBe('horizontal');
        expect(tabList.element.getAttribute('role')).toBe('tablist');
    });

    it('should render correctly with expected attributes when ariaOrientation option is specified as "vertical"', () => {
        // Arrange
        const tabList = new TabList(tabListEl, { ariaOrientation: 'VeRticaL' });

        // Assert
        expect(tabList.element.className).toBe('tab-list tab-list--vertical');
        expect(tabList.element.getAttribute('aria-label')).toBeNull();
        expect(tabList.element.getAttribute('aria-orientation')).toBe('vertical');
        expect(tabList.element.getAttribute('role')).toBe('tablist');
    });

    it('should render with orientation default to horizontal when ariaOrientation option value was invalid', () => {
        // Arrange
        const tabList = new TabList(tabListEl, { ariaOrientation: '3d' });

        // Assert
        expect(tabList.element.className).toBe('tab-list tab-list--horizontal');
        expect(tabList.element.getAttribute('aria-label')).toBeNull();
        expect(tabList.element.getAttribute('aria-orientation')).toBe('horizontal');
        expect(tabList.element.getAttribute('role')).toBe('tablist');
    });

    it('should render with aria label when value is provided', () => {
        // Arrange
        const tabList = new TabList(tabListEl, { ariaLabel: 'describe the purpose of tabs' });

        // Assert
        expect(tabList.element.className).toBe('tab-list tab-list--horizontal');
        expect(tabList.element.getAttribute('aria-label')).toBe('describe the purpose of tabs');
        expect(tabList.element.getAttribute('aria-orientation')).toBe('horizontal');
        expect(tabList.element.getAttribute('role')).toBe('tablist');
    });
});