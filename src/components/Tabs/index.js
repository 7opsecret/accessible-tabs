import './styles.css';

// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement';

// Component(s):
import TabControl, { TAB_CONTROL_BASE_CLASSNAME } from '~/src/components/TabControl';
import TabPanel, { TAB_PANEL_BASE_CLASSNAME } from '~/src/components/TabPanel';

// Enum(s):
import { KEY, DIRECTION } from '~/src/enums/key-code';

// Util(s):
import { uid } from '../../utils/uid';

const TABS_BASE_CLASSNAME = 'tabs';
const PANEL_CSS_SELECTOR  = 'js-tab-panel';
export default class Tabs {
    constructor(element) {
        assertHtmlElement(element, '[Tabs] Invalid HTML Element (args[0])');

        this.element     = element;
        this.tabPanels   = [];
        this.tabControls = [];

        this.mount();
    }

    mount() {
        if (!this.element.id) {
            console.warn('[Tabs] You don\'t have an unique "id", you will be missing the feature to keep your last active tab state.')
        }
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

        [ ...panelEls ].forEach((panelEl, index) => {
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
                onClick: this.handleTabControlClickAndFocus,
                onKeyUp: this.handleTabControlKeyUp,
                onFocus: this.handleTabControlClickAndFocus
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
        const tablistLabel         = this.element.dataset.tablistLabel;
        const tabControlsContainer = document.createElement('div');
        tabControlsContainer.className = 'tab-list';
        tabControlsContainer.setAttribute('role', 'tablist');
        tabControlsContainer.appendChild(tabControlsFragment);
        if (tablistLabel) {
            tabControlsContainer.setAttribute('aria-label', tablistLabel);
        }
        this.element.insertBefore(tabControlsContainer, this.element.firstChild);
    }

    findTabControlById(matchId) {
        return this.tabControls.find(({ id }) => id === matchId);
    }

    findTabControlIndexById(matchId) {
        return this.tabControls.findIndex(({ id }) => id === matchId);
    }

    toggleTabControlsSelectedStateById(selectedTabControlId) {
        this.tabControls.forEach((tabControl) => {
            tabControl.selected = tabControl.id === selectedTabControlId;
        });
    }

    toggleTabPanelsSelectedStateById(selectedTabPanelId) {
        this.tabPanels.forEach((tabPanel) => {
            tabPanel.selected = tabPanel.id === selectedTabPanelId;
        });
    }

    handleTabControlClickAndFocus = (e) => {
        const selectedTabControl = this.findTabControlById(e.currentTarget.id);
        this.selectNextTabByControl(selectedTabControl);
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }

    selectNextTabByControl(nextTabControl) {
        this.toggleTabControlsSelectedStateById(nextTabControl.id);
        this.toggleTabPanelsSelectedStateById(nextTabControl.associateId);
    }

    setFocusOnNextControlByDirection(e, directionKeyCode) {
        const currentTabControlIndex = this.findTabControlIndexById(e.currentTarget.id);
        const nextIndex = DIRECTION[directionKeyCode] + currentTabControlIndex;
        this.setFocusOnNextControlByIndex(nextIndex);
    }

    setFocusOnNextControlByIndex(nextIndex) {
        const lastIndex = this.tabControls.length - 1;
        let _nextIndex = nextIndex;

        if (_nextIndex < 0) {
            _nextIndex = lastIndex - 1;
        }

        if (_nextIndex > lastIndex - 1) {
            _nextIndex = 0;
        }

        this.tabControls[_nextIndex].element.focus();
    }

    handleTabControlKeyUp = (e) => {
        switch (e.keyCode) {
            case KEY.LEFT:
                this.setFocusOnNextControlByDirection(e, KEY.LEFT);
                break;

            case KEY.RIGHT:
                this.setFocusOnNextControlByDirection(e, KEY.RIGHT);
                break;

            case KEY.HOME:
                this.setFocusOnNextControlByIndex(0);
                break;

            case KEY.END:
                this.setFocusOnNextControlByIndex(this.tabControls.length - 1);
                break;
        }
        // update tab panel and control state and attributes
        // update browser history with tabs component's active tab
    }

    updateHistory() {
        // TODO:
        // - Update url so that can direct load page with tabs pre-selected
        // - Go back and forward (browser) will show each active state change history
    }
}