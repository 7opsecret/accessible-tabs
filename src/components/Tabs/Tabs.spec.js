import Tabs from '.';
import { tabsHtmlFixture } from '~/fixtures/tabs-html-fixture';
import { getSelectedAttributesFromElements } from '~/test-helpers/elements';

describe('Component: Tabs', () => {
    const initTabs = (...args) => () => new Tabs(args);

    beforeEach(() => {
        document.body.innerHTML = [...new Array(3)]
            .map((_, index) => tabsHtmlFixture({
                id: `tab-${index + 1}`,
                heading: `Accessible Tab ${index + 1}`,
                tabListLabel: index === 0 ? 'Only first with tablist label' : ''
            }))
            .join('');
    });

    it('should throw error if "Tabs" created without valid "element" payload', () => {
        expect(initTabs()).toThrow('[Tabs] Invalid HTML Element (args[0])');
    });

    it('should "tab-1" have class "tabs"', () => {
        const tab1El = document.getElementById('tab-1');

        new Tabs(tab1El);

        expect(tab1El.className).toBe('tabs');
    });

    it('should multiple Tabs instances all have no duplicate id and associated correctly', () => {
        const tab1El = document.getElementById('tab-1');
        const tab2El = document.getElementById('tab-2');

        const tabs1 = new Tabs(tab1El);
        const tabs2 = new Tabs(tab2El);

        const allPanelEls                        = [
            ...tabs1.element.getElementsByClassName('js-tab-panel'),
            ...tabs2.element.getElementsByClassName('js-tab-panel')
        ];
        const allPanelElsId                      = allPanelEls.map(({ id }) => id);
        const allControlsIdFromPanelAssociatedId = allPanelEls.map((panelEl) => panelEl.getAttribute('aria-labelledby'));
        const totalPanelsUniqueId                = new Set(allPanelElsId).size;
        const expectedtotalPanelsIds             = allPanelEls.length;
        const allPanelsHaveAssociatedControl     = allControlsIdFromPanelAssociatedId.every(controlId => {
            const controlEl = document.getElementById(controlId);
            const [ , , idToMatch ] = controlId.split('-');
            return controlEl.classList.contains('tab-control')
                && controlEl.getAttribute('role') === 'tab'
                && controlEl.getAttribute('aria-controls') === `tab-panel-${idToMatch}`
        });

        expect(totalPanelsUniqueId).toBe(expectedtotalPanelsIds);
        expect(allPanelsHaveAssociatedControl).toBe(true);
    });

    it('should multiple Tabs instances all have no duplicate id and associated correctly', () => {
        const getTablistAriaLabel = tabs =>
            tabs.element
                .querySelector('.tab-list')
                .getAttribute('aria-label');
        const tab1El = document.getElementById('tab-1');
        const tab2El = document.getElementById('tab-2');

        const tabs1 = new Tabs(tab1El);
        const tabs2 = new Tabs(tab2El);

        expect(getTablistAriaLabel(tabs1)).toBe('Only first with tablist label');
        expect(getTablistAriaLabel(tabs2)).toBeNull();
    });

    it('should click on 3rd tab control button toggle selected state correctly', () => {
        const expectedControlElsAttributes = [
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            },
            {
                'aria-selected': 'true',
                class: 'tab-control tab-control--selected',
                tabindex: '0',
            }
        ];
        const expectedPanelElsAttributes = [
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            },
            {
                class: 'js-tab-panel tab-panel tab-panel--selected',
                hidden: null,
            }
        ];
        const tab1El        = document.getElementById('tab-1');
        const indexToSelect = 2;

        const tabs1           = new Tabs(tab1El);
        const tabControlEls   = tabs1.element.getElementsByClassName('tab-control');
        const tabPanelsEls    = tabs1.element.getElementsByClassName('js-tab-panel');
        tabControlEls[indexToSelect].click();

        const controlsAttributes = getSelectedAttributesFromElements(
            tabControlEls,
            [ 'aria-selected', 'class', 'tabindex' ]
        );
        const panelsAttributes   = getSelectedAttributesFromElements(
            tabPanelsEls,
            [ 'class', 'hidden' ]
        );
        expect(controlsAttributes).toEqual(expectedControlElsAttributes);
        expect(panelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when "Home" key up event is fired', () => {

    });

    it('should selected state render correctly when "End" key up event is fired', () => {

    });

    it('should selected state render correctly when "Left" key up event is fired', () => {

    });

    it('should selected state render correctly when "Right" key up event is fired', () => {

    });

    it('should selected state be last element and rest render correctly when selected is first element and "Left" key up event is fired', () => {

    });

    it('should selected state be first element and rest render correctly when selected is last element and "Right" key up event is fired', () => {

    });
});
