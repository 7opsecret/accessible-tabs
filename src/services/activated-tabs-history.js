import { BrowserHistoryApi } from '~/src/api/browser-history';
import { PubSubServices } from './pub-sub';

export const ActivatedTabsHistoryService = (() => {
    // Private
    const _updateTabsHistoryState = (tabsId, selectedTabState) => {
        const prevState = BrowserHistoryApi.getState() || {};
        const nextState = {
            ...prevState,
            tabs: {
                ...prevState.tabs || {},
                [tabsId]: selectedTabState
            }
        };

        return nextState;
    }

    const _createUrlWithAllSelectedTabs = (tabsState, tabsId) => {
        /**
         * Note:
         * - Capture state with Tab Control id only to keep url short
         * - Hash by tabsId to keep user anchored to the top of the tab group
         */
        const url = new URL(window.location);
        Object.entries(tabsState)
            .forEach(([k, v]) => url.searchParams.set(k, v.id));
        url.hash = tabsId // to section instead of tab

        return url;
    }

    // Public
    const mount = ({
        tabsId,
        uiUpdaterCallback,
        popStateFallbackState
    } = {}) => {
        const popStateCallback = (e) => {
            let { id, associateId } = e.state?.tabs?.[tabsId] ?? popStateFallbackState ?? {};
            PubSubServices.publish(tabsId, { id, associateId });
        };

        PubSubServices.subscribe(tabsId, uiUpdaterCallback);
        BrowserHistoryApi.addEventListener(popStateCallback);
    }

    const save = ({
        tabsId,
        selectedTabState
    } = {}) => {
        if(!tabsId) {
            throw new Error('[ActivatedTabsHistoryService]: Save failure due to invalid tabsId')
        }
        const nextState = _updateTabsHistoryState(tabsId, selectedTabState);
        const nextUrl   = _createUrlWithAllSelectedTabs(nextState.tabs, tabsId);

        BrowserHistoryApi.pushState(nextState, '', nextUrl);
    }

    return {
        mount,
        save
    }
})();