import { HistoryApi } from '~/src/api/history'
import { PubSubService } from './pub-sub'

export const ActivatedTabsHistoryService = (() => {
  // Private
  const _mergeTabsState = (newTabsState) => {
    const prevState = HistoryApi.getState() || {}
    const nextState = {
      ...prevState,
      tabs: {
        ...prevState.tabs || {},
        ...newTabsState
      }
    }

    return nextState
  }

  const _createUrlWithAllSelectedTabs = (tabsState, tabsId) => {
    /**
     * Note:
     * - Capture state with Tab Control id only to keep url short
     * - Hash by tabsId to keep user anchored to the top of the tab group
     */
    const url = new URL(window.location)
    Object.entries(tabsState)
      .forEach(([k, v]) => url.searchParams.set(k, v.id))
    url.hash = tabsId // scroll to section instead of tab

    return url
  }

  const _isNextStateSameAsPrevState = (nextState) => {
    const prevState = HistoryApi.getState() || {}
    const prevStateString = JSON.stringify(prevState)
    const nextStateString = JSON.stringify(nextState)

    return nextStateString === prevStateString
  }

  // Public
  const mount = ({
    tabsId,
    uiUpdaterCallback,
    popStateFallbackState
  } = {}) => {
    const popStateCallback = (e) => {
      const { id, associateId } = e.state?.tabs?.[tabsId] ?? popStateFallbackState ?? {}
      PubSubService.publish(tabsId, { id, associateId })
    }

    PubSubService.subscribe(tabsId, uiUpdaterCallback)
    HistoryApi.addEventListener(popStateCallback)
  }

  const save = ({
    tabsId,
    selectedTabState
  } = {}) => {
    if (!tabsId) {
      throw new Error('[ActivatedTabsHistoryService]: Save failure due to invalid tabsId')
    }
    const newTabsState = {
      [tabsId]: {
        id: selectedTabState?.id,
        associateId: selectedTabState?.associateId
      }
    }
    const nextState = _mergeTabsState(newTabsState)
    const nextUrl = _createUrlWithAllSelectedTabs(nextState.tabs, tabsId)

    if (_isNextStateSameAsPrevState(nextState)) {
      return
    }

    HistoryApi.pushState(nextState, '', nextUrl)
  }

  const replaceState = ({
    tabsId,
    selectedTabState
  }) => {
    const newTabsState = {
      [tabsId]: {
        id: selectedTabState?.id,
        associateId: selectedTabState?.associateId
      }
    }
    const nextState = _mergeTabsState(newTabsState)

    if (_isNextStateSameAsPrevState(nextState)) {
      return
    }

    HistoryApi.replaceState(nextState, '')
  }

  return {
    mount,
    save,
    replaceState
  }
})()
