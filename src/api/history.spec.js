import { PubSubService } from '~/src/services/pub-sub';
import { HistoryApi } from './history';

describe('API: HistoryApi', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should #getState return state from window.history.state', () => {
        // Arrange
        const historySpy = jest.spyOn(history, 'state', 'get').mockReturnValue('mocked return state value');

        // Act
        const received = HistoryApi.getState();

        // Assert
        expect(historySpy).toHaveBeenCalledTimes(1);
        expect(received).toBe('mocked return state value');
    });

    it('should #pushState trigger window.history.pushState that called with all payload pass down from HistoryApi.pushState', () => {
        // Arrange
        const historySpy = jest.spyOn(history, 'pushState');

        // Act
        HistoryApi.pushState('a', 'c', 'b');

        // Assert
        expect(historySpy).toHaveBeenNthCalledWith(1, 'a', 'c', 'b');
    });

    it('should #replaceState trigger window.history.replaceState called with all payload pass down from HistoryApi.pushState', () => {
        // Arrange
        const historySpy = jest.spyOn(history, 'replaceState');

        // Act
        HistoryApi.replaceState('m1', 'r2', 'b2');

        // Assert
        expect(historySpy).toHaveBeenNthCalledWith(1, 'm1', 'r2', 'b2');
    });

    it('should #addEventListener trigger PubSubServices.publish called with args - "popstate" and callback function', () => {
        // Arrange
        const mockCallback = jest.fn();
        const subscribeSpy = jest.spyOn(PubSubService, 'subscribe');

        // Act
        HistoryApi.addEventListener(mockCallback);

        // Assert
        expect(subscribeSpy).toHaveBeenNthCalledWith(1, 'popstate', mockCallback);
    });

    it('should #addEventListener not trigger PubSubServices.publish when payload is not a callback function', () => {
        // Arrange
        const subscribeSpy = jest.spyOn(PubSubService, 'subscribe');

        // Act
        HistoryApi.addEventListener();

        // Assert
        expect(subscribeSpy).not.toHaveBeenCalled();
    });
});