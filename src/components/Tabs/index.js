// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement';

// Component(s):
import TabControl, { TAB_CONTROL_BASE_CLASSNAME } from '~/src/components/TabControl';
import TabPanel, { TAB_PANEL_BASE_CLASSNAME } from '~/src/components/TabPanel';

// Util(s):
import { uid } from '../../utils/uid';

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
        const tabControlsFragment = new DocumentFragment();
        const panelEls            = this.element.getElementsByClassName(PANEL_CSS_SELECTOR);
        if (!panelEls.length) return;

        [...panelEls].forEach((panelEl, index) => {
            const id              = panelEl.id || uid();
            const defaultSelected = index === 0
            const tabControlId    = `${TAB_CONTROL_BASE_CLASSNAME}-${id}`;
            const tabPanelId      = `${TAB_PANEL_BASE_CLASSNAME}-${id}`;
            const tabTitle        = panelEl.dataset.tabTitle || 'No title tab';

            // Instance Options:
            const tabPanelOptions = {
                defaultSelected,
                associateId: tabControlId,
                id: tabPanelId
            };
            const tabControlOptions = {
                associateId: tabPanelId,
                defaultSelected,
                id: tabControlId,
                title: tabTitle,
                onClick: this.handleTabControlClick.bind(this),
                // TODO: this.handleTabControlKeyPressed
            };

            this.addTabPanelInstance(tabPanelOptions, panelEl);
            this.addTabControlInstance(tabControlOptions, tabControlsFragment);
        });

        this.renderTabControls(tabControlsFragment);
    }

    addTabPanelInstance(options, panelEl) {
        const tabPanel = new TabPanel(panelEl, options);
        this.tabPanels.push(tabPanel);
    }

    addTabControlInstance(options, tabControlsFragment) {
        const controlEl  = document.createElement('button');
        const tabControl = new TabControl(controlEl, options);
        this.tabControls.push(tabControl);
        tabControlsFragment.appendChild(tabControl.element);
    }

    renderTabControls(tabControlsFragment) {
        const tabControlsContainer = document.createElement('div');
        tabControlsContainer.className = 'tab-list';
        tabControlsContainer.setAttribute('role', 'tablist');
        tabControlsContainer.appendChild(tabControlsFragment);
        this.element.insertBefore(tabControlsContainer, this.element.firstChild);
    }

    handleTabControlClick(e) {
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }

    handleTabControlKeyPressed(e) {
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }

    updateHistory() {
        // TODO:
        // - Update url so that can direct load page with tabs pre-selected
        // - Go back and forward (browser) will show each active state change history
    }
}