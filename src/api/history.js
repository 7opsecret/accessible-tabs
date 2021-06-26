// Service(s):
import { PubSubService } from '~/src/services/pub-sub'

// Util(s):
import { isFunction } from '~/src/utils/assert'

// Local Config(s):
const POPSTATE_EVENT_NAME = 'popstate'

export const HistoryApi = (() => {
  const getState = () => history.state

  const pushState = (...args) => history.pushState(...args)

  const replaceState = (...args) => history.replaceState(...args)

  const addEventListener = (callback) => {
    if (!isFunction(callback)) {
      return
    }

    PubSubService.subscribe(POPSTATE_EVENT_NAME, callback)
  }

  const _popStateCallback = (event) => {
    PubSubService.publish(POPSTATE_EVENT_NAME, event)
  }

  const _init = () => {
    window.addEventListener(
      POPSTATE_EVENT_NAME,
      _popStateCallback
    )
  }

  _init()

  return {
    pushState,
    replaceState,
    getState,
    addEventListener
  }
})()
