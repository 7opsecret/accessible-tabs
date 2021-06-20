// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement';

// Util(s):
import { uid } from '../../utils/uid';

// Component(s):
import TabPanel, { TAB_PANEL_BASE_CLASSNAME } from '~/src/components/TabPanel';

const TABS_BASE_CLASSNAME = 'tabs';
const PANEL_CSS_SELECTOR  = 'js-tab-panel';

export default class Tabs {
    constructor(element, options) {
        assertHtmlElement(element, '[Tabs] Invalid HTML Element (args[0])');

        // # options
        // - aria-label

        // # internal state
        this.element     = element;
        this.tabPanels   = [];
        this.tabControls = [];

        // Setup Panels and Controls
        this.mount();
    }

    mount() {
        this.setDefaultCssClasses();
        this.setupPanelsAndControls();
    }

    setDefaultCssClasses() {
        this.element.classList.add(TABS_BASE_CLASSNAME);
    }

    setupPanelsAndControls() {
        // 2. within wrapper, render each panels with:
        //    - class "js-tab-panel"
        //    - Tab control title will be presented by data atrribute "data-tab-title"
        // 3. find all panel elements and create tab control and panel instances with handler attached
        //    along with uid for both so that they'are associated to each other
        // 4. setup tablist container and append all tab controls element to tablist container
        // 5. prepend tablist container (with tab controls) to wrapper

        const panelEls = this.element.getElementsByClassName(PANEL_CSS_SELECTOR);
        if (!panelEls.length) return;

        [...panelEls].forEach((panelEl, index) => {
            const id           = panelEl.id || uid();
            const tabControlId = `tab-control-${id}`;
            const tabPanelId   = `${TAB_PANEL_BASE_CLASSNAME}-${id}`;

            // Instance Options:
            const tabPanelOptions = {
                defaultSelected: index === 0,
                associateId: tabControlId,
                id: tabPanelId
            };

            this.addTabPanelInstance(panelEl, tabPanelOptions);
        });
    }

    addTabPanelInstance(panelEl, options) {
        const tabPanel = new TabPanel(panelEl, options);
        this.tabPanels.push(tabPanel);
    }

    handleTabControlClick(e) {
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }

    handleTabControlKeyPressed(e) {
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }
}