import TabPanel from '.';

describe('Component: TabPanel', () => {
    const initTabPanel = (...args) => () => new TabPanel(args);
    const WITH_DEFAULT_SELECTED_OPTIONS = {
        id: 'tab-panel-1',
        associateId: 'tab-control-1',
        defaultSelected: true
    };
    const WITHOUT_DEFAULT_SELECTED_OPTIONS = {
        id: 'tab-panel-1',
        associateId: 'tab-control-1'
    };
    let panelEl;

    beforeEach(() => {
        panelEl = document.createElement('div');
    });

    it('should throw error if "TabPanel" created without valid "element" payload', () => {
        expect(initTabPanel()).toThrow('[TabPanel] Invalid HTML Element (args[0])');
    });

    it('should render class name correctly when created with "defaultSelected" is false', () => {
        const tabPanel = new TabPanel(
            panelEl
        );

        expect(tabPanel.element.className).toBe('tab-panel');
    });

    it('should render class name correctly when created with "defaultSelected" is true', () => {
        const tabPanel = new TabPanel(
            panelEl,
            WITH_DEFAULT_SELECTED_OPTIONS
        );

        expect(tabPanel.element.className).toBe('tab-panel tab-panel--selected');
    });

    it('should element attributes set correctly with "defaultSelected" is true', () => {
        const tabPanel = new TabPanel(
            panelEl,
            WITH_DEFAULT_SELECTED_OPTIONS
        );

        expect(tabPanel.element.id).toBe('tab-panel-1');
        expect(tabPanel.element.getAttribute('role')).toBe('tabpanel');
        expect(tabPanel.element.getAttribute('tabindex')).toBe('0');
        expect(tabPanel.element.getAttribute('aria-labelledby')).toBe('tab-control-1');
        expect(tabPanel.element.getAttribute('hidden')).toBeNull();
    });

    it('should element attributes set correctly with "defaultSelected" is false', () => {
        const tabPanel = new TabPanel(
            panelEl,
            WITHOUT_DEFAULT_SELECTED_OPTIONS
        );

        expect(tabPanel.element.id).toBe('tab-panel-1');
        expect(tabPanel.element.getAttribute('role')).toBe('tabpanel');
        expect(tabPanel.element.getAttribute('tabindex')).toBe('0');
        expect(tabPanel.element.getAttribute('aria-labelledby')).toBe('tab-control-1');
        expect(tabPanel.element.getAttribute('hidden')).toBe('');
    });

    it('should element attributes changed as expected when instance selected state is updated', () => {
        const tabPanel = new TabPanel(
            panelEl,
            WITHOUT_DEFAULT_SELECTED_OPTIONS
        );

        tabPanel.selected = true;

        expect(tabPanel.element.className).toBe('tab-panel tab-panel--selected');
        expect(tabPanel.element.getAttribute('hidden')).toBeNull();

        tabPanel.selected = false;

        expect(tabPanel.element.className).toBe('tab-panel');
        expect(tabPanel.element.getAttribute('hidden')).toBe('');
    });
});