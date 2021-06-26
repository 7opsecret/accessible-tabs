import { PubSubService } from './pub-sub'

describe('Service: PubSubService', () => {
  const mockedPopStateCallback1 = jest.fn()
  const mockedPopStateCallback2 = jest.fn()
  const mockedOtherCallback = jest.fn()

  beforeAll(() => {
    PubSubService.subscribe('pop-state', mockedPopStateCallback1)
    PubSubService.subscribe('pop-state', mockedPopStateCallback2)
    PubSubService.subscribe('misc', mockedOtherCallback)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should multiple subscribed events callback with "pop-state" all called with published payload', () => {
    // Act
    PubSubService.publish('pop-state', 'mock-popstate-payload')

    // Assert
    expect(mockedPopStateCallback1).toHaveBeenNthCalledWith(1, 'mock-popstate-payload')
    expect(mockedPopStateCallback2).toHaveBeenNthCalledWith(1, 'mock-popstate-payload')
    expect(mockedOtherCallback).not.toHaveBeenCalled()
  })

  it('should multiple subscribed event callback with "misc" called with published payload', () => {
    // Act
    PubSubService.publish('misc', 'mock-misc-payload')

    // Assert
    expect(mockedPopStateCallback1).not.toHaveBeenCalled()
    expect(mockedPopStateCallback2).not.toHaveBeenCalled()
    expect(mockedOtherCallback).toHaveBeenNthCalledWith(1, 'mock-misc-payload')
  })
})
