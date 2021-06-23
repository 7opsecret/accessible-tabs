import './styles.css';

// Service(s):
import { ActivatedTabsHistoryService } from '~/src/services/activated-tabs-history';
import { AriaValidationService } from '~/src/services/aria-validation';
import { TabItems } from '~/src/services/tab-items';

// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement';

// Component(s):
import TabControl, { TAB_CONTROL_BASE_CLASSNAME } from '~/src/components/TabControl';
import TabList from '~/src/components/TabList';
import TabPanel, { TAB_PANEL_BASE_CLASSNAME } from '~/src/components/TabPanel';

// Enum(s):
import { ARIA_ORIENTATION } from '~/src/enums/aria-values';
import { KEY, DIRECTION } from '~/src/enums/key-code';

// Util(s):
import { uid } from '~/src/utils/uid';

// Config(s):
const TABS_BASE_CLASSNAME = 'tabs';
const PANEL_CSS_SELECTOR  = 'js-tab-panel';

export default class Tabs {
    constructor(
        element,
        {
            orientation
        } = {}
    ) {
        assertHtmlElement(element, '[Tabs] Invalid HTML Element (args[0])');
        if (!element.id) {
            console.warn('[Tabs] You don\'t have an unique "id", you will be missing the feature to keep your last active tab state')
        }

        this.element     = element;
        this.tabItems    = null;
        this.tabList     = null;
        this.orientation = AriaValidationService.isValidOrientation(orientation)
            ? orientation.toLowerCase()
            : ARIA_ORIENTATION.HORIZONTAL; // fallback to horizontal
            // TODO: add test
        this.isVerticalOrientation = this.orientation === ARIA_ORIENTATION.VERTICAL;
        this.shouldProcessHistory  = Boolean(this.element.id);

        this.mount();
    }

    mount() {
        this.tabItems = new TabItems();
        this.tabList  = new TabList(
            document.createElement('div'),
            {
                ariaLabel: this.element.dataset.tablistLabel,
                ariaOrientation: this.orientation
            }
        );
        this.setDefaultCssClasses();
        this.setupPanelsAndControls();

        if (this.shouldProcessHistory) {
            const firstTabItem = this.tabItems.findChildByIndex(0);
            ActivatedTabsHistoryService.mount({
                tabsId: this.element.id,
                uiUpdaterCallback: this.selectNextTabByControl.bind(this),
                popStateFallbackState: {
                    id: firstTabItem.tabControl.id,
                    associateId: firstTabItem.tabPanel.id
                }
            });
        }
        this.setSelectFromSearchParam();
    }

    setSelectFromSearchParam() {
        var params = new URLSearchParams(window.location.search)

        let temp = []

        for (let p of params) {
            temp.push(p)
        }
        const entries = new Map(temp);
        const tabsFromSearchParam = Object.fromEntries(entries);
        const potentialControlId = tabsFromSearchParam[this.element.id];
        const tabControlInstance = this.tabItems.findChildByTabControlId(potentialControlId)?.tabControl;
        if (tabControlInstance) {
            this.selectNextTabByControl(tabControlInstance)
        }
    }

    setDefaultCssClasses() {
        this.element.classList.add(TABS_BASE_CLASSNAME, TABS_BASE_CLASSNAME + '--' + this.orientation);
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
                onFocus: this.handleTabControlFocus,
                onKeyUp: this.handleTabControlKeyUp,
                onKeyDown: this.handleTabControlKeyDown,
                title: tabTitle
            };

            const tabControl = new TabControl(document.createElement('a'), tabControlOptions);
            const tabPanel   = new TabPanel(panelEl, tabPanelOptions);
            this.tabItems.addChild({ tabControl, tabPanel });
            tabControlsFragment.appendChild(tabControl.element);
        });

        this.renderTabControls(tabControlsFragment);
    }

    renderTabControls(tabControlsFragment) {
        this.tabList.element.appendChild(tabControlsFragment);
        this.element.insertBefore(this.tabList.element, this.element.firstChild);
    }

    handleTabControlFocus = (e) => {
        const selectedTabControl = this.tabItems.findChildByTabControlId(e.currentTarget.id).tabControl;
        this.selectNextTabByControl(selectedTabControl);

        if (!this.shouldProcessHistory) {
            return;
        }

        ActivatedTabsHistoryService.save({
            tabsId: this.element.id,
            selectedTabState: {
                id: selectedTabControl.id,
                associateId: selectedTabControl.associateId
            }
        });
    }

    selectNextTabByControl(nextTabControl) {
        this.tabItems.forEach(({
            tabPanel,
            tabControl
        }) => {
            tabPanel.selected = tabPanel.id === nextTabControl.associateId;
            tabControl.selected = tabControl.id === nextTabControl.id;
        });
    }

    setFocusOnNextControlByDirection(e, directionKeyCode) {
        const currentTabControlIndex = this.tabItems.findChildIndexByTabControlId(e.currentTarget.id);
        const nextIndex = DIRECTION[directionKeyCode] + currentTabControlIndex;
        this.setFocusOnNextControlByIndex(nextIndex);
    }

    setFocusOnNextControlByIndex(nextIndex) {
        const lastIndex = this.tabItems.lastChildIndex;
        let _nextIndex = nextIndex;

        if (_nextIndex < 0) {
            _nextIndex = lastIndex;
        }

        if (_nextIndex > lastIndex) {
            _nextIndex = 0;
        }

        this.tabItems.findChildByIndex(_nextIndex).tabControl.element.focus();
    }

    handleVerticalOrientationTabControlKeyUp = (e) => {
        switch (e.keyCode) {
            case KEY.UP:
                this.setFocusOnNextControlByDirection(e, KEY.UP);
                break;

            case KEY.DOWN:
                this.setFocusOnNextControlByDirection(e, KEY.DOWN);
                break;

            case KEY.HOME:
                this.setFocusOnNextControlByIndex(0);
                break;

            case KEY.END:
                this.setFocusOnNextControlByIndex(this.tabItems.lastChildIndex);
                break;
        }
    }

    handleHorizontalOrientationTabControlKeyUp = (e) => {
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
                this.setFocusOnNextControlByIndex(this.tabItems.lastChildIndex);
                break;
        }
    }

    handleTabControlKeyUp = (e) => {
        this.isVerticalOrientation
            ? this.handleVerticalOrientationTabControlKeyUp(e)
            : this.handleHorizontalOrientationTabControlKeyUp(e)
    }

    handleTabControlKeyDown = (e) => {
        if (this.isVerticalOrientation) {
            switch (e.keyCode) {
                case KEY.UP:
                case KEY.DOWN:
                    e.preventDefault();
            }
        }

        switch (e.keyCode) {
            case KEY.HOME:
            case KEY.END:
                e.preventDefault();
        }
    }
}