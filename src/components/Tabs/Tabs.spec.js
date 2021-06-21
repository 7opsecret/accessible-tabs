import Tabs from '.';
import { tabsHtmlFixture } from '~/fixtures/tabs-html-fixture';
import { getSelectedAttributesFromElements } from '~/test-helpers/elements';
import { fireKeyUpEvent } from '~/test-helpers/events';

// Enum(s):
import { KEY } from '~/src/enums/key-code';

const getTestAttributesFromTabsInstance = (tabsInstance) => {
    const tabControlEls = tabsInstance.element.getElementsByClassName('tab-control');
    const tabPanelsEls  = tabsInstance.element.getElementsByClassName('js-tab-panel');
    const tabControlsAttributes = getSelectedAttributesFromElements(
        tabControlEls,
        [ 'aria-selected', 'class', 'tabindex' ]
    );
    const tabPanelsAttributes   = getSelectedAttributesFromElements(
        tabPanelsEls,
        [ 'class', 'hidden' ]
    );

    return {
        tabControlsAttributes,
        tabPanelsAttributes
    };
}

const fireKeyUpEventViaSelectedControl = (
    tabsInstance,
    KeyboardEventInit
) => {
    fireKeyUpEvent(
        tabsInstance.element.querySelector('.tab-control--selected'),
        KeyboardEventInit
    );
}

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

    it('should tablist element have "aria-label" when "data-tablist-label" is specified', () => {
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

        const tabs1         = new Tabs(tab1El);
        const tabControlEls = tabs1.element.getElementsByClassName('tab-control');
        tabControlEls[indexToSelect].click();
        /**
         * Note:
         * For some reason JSDOM doesn't seems trigger focus on click.
         * Have tested by appending different elements into body (a, button, input)
         * but still no luck. This is a temporary solution to be investigate further
         * in the future.
         *
         * Important:
         * It has been tested on Safari, Edge, Chrome, Firefox cta click does trigger focus.
         * */
        tabControlEls[indexToSelect].focus();

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when "Home" key up event is fired', () => {
        const expectedControlElsAttributes = [
            {
                'aria-selected': 'true',
                class: 'tab-control tab-control--selected',
                tabindex: '0',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            }
        ];
        const expectedPanelElsAttributes = [
            {
                class: 'js-tab-panel tab-panel tab-panel--selected',
                hidden: null,
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            }
        ];
        const tab1El = document.getElementById('tab-1');

        const tabs1 = new Tabs(tab1El);
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.RIGHT });
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.HOME });

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when "End" key up event is fired', () => {
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
        const tab1El = document.getElementById('tab-1');

        const tabs1 = new Tabs(tab1El);
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.END });

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when "Left" key up event is fired', () => {
        const expectedControlElsAttributes = [
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            },
            {
                'aria-selected': 'true',
                class: 'tab-control tab-control--selected',
                tabindex: '0',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            }
        ];
        const expectedPanelElsAttributes = [
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            },
            {
                class: 'js-tab-panel tab-panel tab-panel--selected',
                hidden: null,
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            }
        ];
        const tab1El = document.getElementById('tab-1');

        const tabs1 = new Tabs(tab1El);
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.END });
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.LEFT });

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when "Right" key up event is fired', () => {
        const expectedControlElsAttributes = [
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            },
            {
                'aria-selected': 'true',
                class: 'tab-control tab-control--selected',
                tabindex: '0',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            }
        ];
        const expectedPanelElsAttributes = [
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            },
            {
                class: 'js-tab-panel tab-panel tab-panel--selected',
                hidden: null,
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            }
        ];
        const tab1El = document.getElementById('tab-1');

        const tabs1 = new Tabs(tab1El);
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.RIGHT });

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when first element was selected and "Left" key up event is fired', () => {
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
        const tab1El = document.getElementById('tab-1');

        const tabs1 = new Tabs(tab1El);
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.LEFT });

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });

    it('should selected state render correctly when last element was selected and "Right" key up event is fired', () => {
        const expectedControlElsAttributes = [
            {
                'aria-selected': 'true',
                class: 'tab-control tab-control--selected',
                tabindex: '0',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            },
            {
                'aria-selected': 'false',
                class: 'tab-control',
                tabindex: '-1',
            }
        ];
        const expectedPanelElsAttributes = [
            {
                class: 'js-tab-panel tab-panel tab-panel--selected',
                hidden: null,
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            },
            {
                class: 'js-tab-panel tab-panel',
                hidden: '',
            }
        ];
        const tab1El = document.getElementById('tab-1');

        const tabs1 = new Tabs(tab1El);
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.END });
        fireKeyUpEventViaSelectedControl(tabs1, { keyCode: KEY.RIGHT });

        const {
            tabControlsAttributes,
            tabPanelsAttributes
        } = getTestAttributesFromTabsInstance(tabs1);
        expect(tabControlsAttributes).toEqual(expectedControlElsAttributes);
        expect(tabPanelsAttributes).toEqual(expectedPanelElsAttributes);
    });
});
