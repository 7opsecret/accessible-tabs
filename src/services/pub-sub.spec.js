import { PubSubServices } from './pub-sub';

describe('Service: PubSubServices', () => {
    const mockedPopStateCallback1 = jest.fn();
    const mockedPopStateCallback2 = jest.fn();
    const mockedOtherCallback     = jest.fn();

    beforeAll(() => {
        PubSubServices.subscribe('pop-state', mockedPopStateCallback1);
        PubSubServices.subscribe('pop-state', mockedPopStateCallback2);
        PubSubServices.subscribe('misc', mockedOtherCallback);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should multiple subscribed events callback with "pop-state" all called with published payload', () => {
        // Act
        PubSubServices.publish('pop-state', 'mock-popstate-payload');

        // Assert
        expect(mockedPopStateCallback1).toHaveBeenNthCalledWith(1, 'mock-popstate-payload');
        expect(mockedPopStateCallback2).toHaveBeenNthCalledWith(1, 'mock-popstate-payload');
        expect(mockedOtherCallback).not.toHaveBeenCalled();
    });

    it('should multiple subscribed event callback with "misc" called with published payload', () => {
        // Act
        PubSubServices.publish('misc', 'mock-misc-payload');

        // Assert
        expect(mockedPopStateCallback1).not.toHaveBeenCalled();
        expect(mockedPopStateCallback2).not.toHaveBeenCalled();
        expect(mockedOtherCallback).toHaveBeenNthCalledWith(1, 'mock-misc-payload');
    });
});