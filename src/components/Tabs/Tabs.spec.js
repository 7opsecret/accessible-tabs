import Tabs from '.';
import { tabsHtmlFixture } from '~/fixtures/tabs-html-fixture';

describe('Component: Tabs', () => {
    const initTabs = (...args) => () => new Tabs(args);

    beforeEach(() => {
        document.body.innerHTML = [...new Array(2)]
            .map((_, index) => tabsHtmlFixture({
                id: `tab-${index + 1}`,
                tabsTitle: `Accessible Tab ${index + 1}`
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

    it('should multiple Tabs instances all panels have no duplicate id', () => {
        const tab1El = document.getElementById('tab-1');
        const tab2El = document.getElementById('tab-2');

        new Tabs(tab1El);
        new Tabs(tab2El);

        const allPanelEls      = document.getElementsByClassName('js-tab-panel');
        const allPanelElsId    = [...allPanelEls].map(({ id }) => id);
        const totalUniqueId    = new Set(allPanelElsId).size;
        const expectedtotalIds = allPanelEls.length

        expect(totalUniqueId).toBe(expectedtotalIds);
    });
});
