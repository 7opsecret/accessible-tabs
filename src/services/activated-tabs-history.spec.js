jest.mock('~/src/api/browser-history', () => ({
    BrowserHistoryApi: {
        addEventListener: jest.fn(),
        pushState: jest.fn(),
        getState: jest.fn()
    }
}));

jest.mock('./pub-sub', () => ({
    PubSubServices: {
        subscribe: jest.fn()
    }
}));

import { BrowserHistoryApi } from '~/src/api/browser-history';
import { PubSubServices } from './pub-sub';
import { ActivatedTabsHistoryService } from './activated-tabs-history';

describe('Service: ActivatedTabsHistoryService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When #mount is called', () => {
        it('should BrowserHistoryApi.addEventListener and PubSubServices.subscribe has been called with expected payload', () => {
            // Arrange
            const mockUiUpdaterCallback = jest.fn();
            const mockMountPayload = {
                tabsId: 'mock-tabs-id',
                uiUpdaterCallback: mockUiUpdaterCallback,
                popStateFallbackState: {}
            }

            // Act
            ActivatedTabsHistoryService.mount(mockMountPayload);

            // Assert
            expect(PubSubServices.subscribe).toHaveBeenNthCalledWith(1, 'mock-tabs-id', mockUiUpdaterCallback);
            expect(BrowserHistoryApi.addEventListener).toHaveBeenCalledTimes(1);
        });
    });

    describe('When #save is called', () => {
        beforeEach(() => {
            BrowserHistoryApi.getState.mockReturnValueOnce({
                others: 'fake other props',
                tabs: {
                    'old-tabs-1': {
                        id: 'old-tab-control-3',
                        associateId: 'old-tab-panel-3'
                    }
                }
            });
        });

        it('should BrowserHistoryApi.pushState called with new tab state added with existing other states', () => {
            // Arrange
            const mockSavePayload = {
                tabsId: 'next-tabs-2',
                selectedTabState: {
                    id: 'next-tab-control-2',
                    associateId: 'next-tab-panel-2'
                }
            };

            // Act
            ActivatedTabsHistoryService.save(mockSavePayload);

            // Assert
            const expectedNextState = {
                others: 'fake other props',
                tabs: {
                    'old-tabs-1': {
                        id: 'old-tab-control-3',
                        associateId: 'old-tab-panel-3'
                    },
                    'next-tabs-2': {
                        id: 'next-tab-control-2',
                        associateId: 'next-tab-panel-2'
                    }
                }
            };
            const expectedNextUrl = 'http://localhost/?old-tabs-1=old-tab-control-3&next-tabs-2=next-tab-control-2#next-tabs-2';

            expect(BrowserHistoryApi.pushState).toHaveBeenCalledTimes(1);
            expect(BrowserHistoryApi.pushState.mock.calls[0][0]).toEqual(expectedNextState);
            expect(BrowserHistoryApi.pushState.mock.calls[0][1]).toBe('');
            expect(BrowserHistoryApi.pushState.mock.calls[0][2].href).toBe(expectedNextUrl);
        });

        it('should BrowserHistoryApi.pushState called with updated tab state overwrite existing state', () => {
            // Arrange
            const mockSavePayload = {
                tabsId: 'old-tabs-1',
                selectedTabState: {
                    id: 'updated-old-tab-control-2',
                    associateId: 'updated-old-tab-panel-2'
                }
            };

            // Act
            ActivatedTabsHistoryService.save(mockSavePayload);

            // Assert
            const expectedNextState = {
                others: 'fake other props',
                tabs: {
                    'old-tabs-1': {
                        id: 'updated-old-tab-control-2',
                        associateId: 'updated-old-tab-panel-2'
                    }
                }
            };
            const expectedNextUrl = 'http://localhost/?old-tabs-1=updated-old-tab-control-2#old-tabs-1';

            expect(BrowserHistoryApi.pushState).toHaveBeenCalledTimes(1);
            expect(BrowserHistoryApi.pushState.mock.calls[0][0]).toEqual(expectedNextState);
            expect(BrowserHistoryApi.pushState.mock.calls[0][1]).toBe('');
            expect(BrowserHistoryApi.pushState.mock.calls[0][2].href).toBe(expectedNextUrl);
        });

        it('should BrowserHistoryApi.pushState throw error when called without tabsId payload', () => {
            // Arrange
            const mockSavePayload = {
                selectedTabState: {}
            };

            // Act
            const whenSaveCalledWithoutTabsId = () => ActivatedTabsHistoryService.save(mockSavePayload);

            // Assert
            expect(whenSaveCalledWithoutTabsId).toThrow('[ActivatedTabsHistoryService]: Save failure due to invalid tabsId');
        });
    });
});