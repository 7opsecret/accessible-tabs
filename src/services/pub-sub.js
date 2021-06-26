import { isArray } from '~/src/utils/assert'

export const PubSubService = (() => {
  const subscribers = {}

  const subscribe = (event, callback) => {
    if (!isArray(subscribers[event])) {
      subscribers[event] = []
    }

    subscribers[event] = [
      ...subscribers[event],
      callback
    ]
  }

  const publish = (event, payload) => {
    if (!isArray(subscribers[event])) {
      return
    }

    const callback = (cb) => cb(payload)

    subscribers[event]
      .forEach(callback)
  }

  return {
    subscribe,
    publish
  }
})()
