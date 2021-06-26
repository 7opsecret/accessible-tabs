jest.mock('~/src/api/history', () => ({
    HistoryApi: {
        addEventListener: jest.fn(),
        getState: jest.fn(),
        pushState: jest.fn(),
        replaceState: jest.fn()
    }
}));

jest.mock('./pub-sub', () => ({
    PubSubService: {
        subscribe: jest.fn()
    }
}));

import { HistoryApi } from '~/src/api/history';
import { PubSubService } from './pub-sub';
import { ActivatedTabsHistoryService } from './activated-tabs-history';

describe('Service: ActivatedTabsHistoryService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Given #mount is called', () => {
        it('should HistoryApi.addEventListener and PubSubService.subscribe has been called with expected payload', () => {
            // Arrange
            const mockUiUpdaterCallback = jest.fn();
            const mockMountPayload      = {
                tabsId: 'mock-tabs-id',
                uiUpdaterCallback: mockUiUpdaterCallback,
                popStateFallbackState: {}
            };

            // Act
            ActivatedTabsHistoryService.mount(mockMountPayload);

            // Assert
            expect(PubSubService.subscribe).toHaveBeenNthCalledWith(1, 'mock-tabs-id', mockUiUpdaterCallback);
            expect(HistoryApi.addEventListener).toHaveBeenCalledTimes(1);
        });
    });

    describe('Given #save is called', () => {
        beforeEach(() => {
            HistoryApi.getState.mockReturnValue({
                others: 'fake other props',
                tabs: {
                    'old-tabs-1': {
                        id: 'old-tab-control-3',
                        associateId: 'old-tab-panel-3'
                    }
                }
            });
        });

        it('should HistoryApi.pushState called with new tab state added with existing other states', () => {
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

            expect(HistoryApi.pushState).toHaveBeenCalledTimes(1);
            expect(HistoryApi.pushState.mock.calls[0][0]).toEqual(expectedNextState);
            expect(HistoryApi.pushState.mock.calls[0][1]).toBe('');
            expect(HistoryApi.pushState.mock.calls[0][2].href).toBe(expectedNextUrl);
        });

        it('should HistoryApi.pushState called with updated tab state overwrite existing state', () => {
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

            expect(HistoryApi.pushState).toHaveBeenCalledTimes(1);
            expect(HistoryApi.pushState.mock.calls[0][0]).toEqual(expectedNextState);
            expect(HistoryApi.pushState.mock.calls[0][1]).toBe('');
            expect(HistoryApi.pushState.mock.calls[0][2].href).toBe(expectedNextUrl);
        });

        it('should HistoryApi.pushState not called when previous state and next state are same', () => {
            // Arrange
            const mockSavePayload = {
                tabsId: 'old-tabs-1',
                selectedTabState: {
                    id: 'old-tab-control-3',
                    associateId: 'old-tab-panel-3'
                }
            };

            // Act
            ActivatedTabsHistoryService.save(mockSavePayload);

            // Assert
            expect(HistoryApi.pushState).not.toHaveBeenCalled();
        });

        it('should HistoryApi.pushState throw error when called without tabsId payload', () => {
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

    describe('Given #replaceState is called', () => {
        it('should HistoryApi.replaceState called with next state that included new tabs state and other existing states', () => {
            // Arrange
            const mockExistingState = {
                somethingElse: 'test other props',
                tabs: {
                    td1: {
                        id: 'tc-item-1',
                        associateId: 'tp-item-2'
                    }
                }
            };
            const mockNewTabsState = {
                tdNew: {
                    id: 'tdnc-item-5',
                    associatedId: 'tdnp-item-5'
                }
            };
            HistoryApi.getState.mockReturnValueOnce(mockExistingState);

            // Act
            ActivatedTabsHistoryService.replaceState(mockNewTabsState);

            // Assert
            const expected = {
                somethingElse: 'test other props',
                tabs: {
                    td1: {
                        id: 'tc-item-1',
                        associateId: 'tp-item-2'
                    },
                    tdNew: {
                        id: 'tdnc-item-5',
                        associatedId: 'tdnp-item-5'
                    }
                }
            };
            expect(HistoryApi.replaceState).toHaveBeenNthCalledWith(1, expected, '');
        });

        it('should HistoryApi.replaceState called with next state that update existing tabs state', () => {
            // Arrange
            const mockExistingState = {
                somethingElse: 'test other props',
                tabs: {
                    td1: {
                        id: 'tc-item-1',
                        associateId: 'tp-item-2'
                    },
                    tdNew: {
                        id: 'tdnc-item-5',
                        associatedId: 'tdnp-item-5'
                    }
                }
            };
            const mockUpdatedTabsState = {
                tdNew: {
                    id: 'tdnc-item-latest',
                    associatedId: 'tdnp-item-latest'
                }
            };
            HistoryApi.getState.mockReturnValueOnce(mockExistingState);

            // Act
            ActivatedTabsHistoryService.replaceState(mockUpdatedTabsState);

            // Assert
            const expected = {
                somethingElse: 'test other props',
                tabs: {
                    td1: {
                        id: 'tc-item-1',
                        associateId: 'tp-item-2'
                    },
                    tdNew: {
                        id: 'tdnc-item-latest',
                        associatedId: 'tdnp-item-latest'
                    }
                }
            };
            expect(HistoryApi.replaceState).toHaveBeenNthCalledWith(1, expected, '');
        });

        it('should HistoryApi.replaceState not called when previous state and next state are same', () => {
            // Arrange
            const mockExistingState = {
                somethingElse: 'irrelevant',
                tabs: {
                    td1: {
                        id: 'tc-item-1',
                        associateId: 'tp-item-2'
                    }
                }
            }
            const mockUpdatedTabsState = {
                td1: {
                    id: 'tc-item-1',
                    associateId: 'tp-item-2'
                }
            };
            HistoryApi.getState.mockReturnValue(mockExistingState);

            console.log('---- prev ', HistoryApi.getState())

            // Act
            ActivatedTabsHistoryService.replaceState(mockUpdatedTabsState);

            // Assert
            expect(HistoryApi.replaceState).not.toHaveBeenCalled();
        });
    });
});