// Service(s):
import { TabItemsService } from './tab-items';

// Fixture(s):
import { tabControlsAndPanelsFixtures } from '~/fixtures/tab-controls-and-panels-fixture';

const addChildrenToTabItemsServiceInstance = (children) => (tabItemsInstance) =>
    children.forEach((child) => tabItemsInstance.addChild(child));

describe('Services: TabItemsService', () => {
    const add3ChildrenToTabItemsServiceInstance = addChildrenToTabItemsServiceInstance(
        tabControlsAndPanelsFixtures(3)
    );

    it('should getter: lastChildIndex return 2 when have 3 children', () => {
        // Arrange
        const tabItems = new TabItemsService();

        // Act
        add3ChildrenToTabItemsServiceInstance(tabItems);

        // Assert
        expect(tabItems.lastChildIndex).toBe(2);
    });

    it('should #forEach throw error when called without any payload', () => {
        // Arrange
        const tabItems = new TabItemsService();

        // Assert
        expect(() => tabItems.forEach()).toThrow('[TabItemsService] Invalid callback function');
    });

    it.each`
    arg
    ${{}}
    ${[]}
    ${null}
    ${true}
    ${1}
    `('should #forEach throw error when called with $arg', ({
        arg
    }) => {
        // Arrange
        const tabItems = new TabItemsService();

        // Assert
        expect(() => tabItems.forEach(arg)).toThrow('[TabItemsService] Invalid callback function');
    });

    it('should #addChild add both TabPanel and TabControl instances as children as 1 object', () => {
        // Arrange
        const tabItems  = new TabItemsService();
        const mockChild = tabControlsAndPanelsFixtures(1)[0];

        // Act
        tabItems.addChild(mockChild);

        // Assert
        expect(tabItems.children.length).toBe(1);
    });

    it('should #addChild throw error when trying to add invalid data type', () => {
        // Arrange
        const tabItems = new TabItemsService();

        // Assert
        expect(() => tabItems.addChild({}))
            .toThrow('[TabItemsService] tabControl needs to be instance of TabControl');
    });

    it('should #addChild throw error when trying to add invalid tabPanel', () => {
        // Arrange
        const tabItems             = new TabItemsService();
        const MockBadClass         = class {};
        const mockBadClassInstance = new MockBadClass();
        const { tabControl }       = tabControlsAndPanelsFixtures(1)[0];

        // Assert
        expect(() => tabItems.addChild({ tabControl, tabPanel: mockBadClassInstance }))
            .toThrow('[TabItemsService] tabPanel needs to be instance of TabPanel');
    });

    describe('When tabItems instance have 3 children', () => {
        let tabItems;

        beforeAll(() => {
            tabItems = new TabItemsService();
            add3ChildrenToTabItemsServiceInstance(tabItems);
        });

        it('should #forEach callback function called 3 times with 3 children', () => {
            // Arrange
            const mockCallback = jest.fn();

            // Act
            tabItems.forEach(mockCallback);

            // Assert
            expect(mockCallback).toHaveBeenCalledTimes(3);
        });

        it('should #findChildByTabControlId return both TabPanel and TabControl instances when matched found', () => {
            // Act
            const received = tabItems.findChildByTabControlId('tab-control-1');

            // Assert
            expect(received).toMatchObject({
                tabPanel: {
                    id: 'tab-panel-1',
                    associateId: 'tab-control-1'
                },
                tabControl :{
                    id: 'tab-control-1',
                    associateId: 'tab-panel-1'
                }
            });
        });

        it('should #findChildByTabControlId return undefined when no matched found', () => {
            // Act
            const received = tabItems.findChildByTabControlId('tabx-control-y');

            // Assert
            expect(received).toBeUndefined();
        });

        it('should #findChildByIndex return child at specified index when specified index is valid', () => {
            // Act
            const received = tabItems.findChildByIndex(2);

            // Assert
            expect(received).toMatchObject({
                tabPanel: {
                    id: 'tab-panel-2',
                    associateId: 'tab-control-2'
                },
                tabControl :{
                    id: 'tab-control-2',
                    associateId: 'tab-panel-2'
                }
            });
        });

        it('should #findChildByIndex return undefined when specified index is invalid', () => {
            // Act
            const received = tabItems.findChildByIndex(9999);

            // Assert
            expect(received).toBeUndefined();
        });

        it('should #findChildIndexByTabControlId return index of matched child when child exist', () => {
            // Act
            const received = tabItems.findChildIndexByTabControlId('tab-control-1');

            // Assert
            expect(received).toBe(1);
        });

        it('should #findChildIndexByTabControlId return -1 when child not exist', () => {
            // Act
            const received = tabItems.findChildIndexByTabControlId('tab-panel-2');

            // Assert
            expect(received).toBe(-1);
        });
    });

    describe('When tabItems have no children', () => {
        let tabItems;

        beforeAll(() => {
            tabItems = new TabItemsService();
        });

        it('should getter: lastChildIndex return -1 when request last index of children', () => {
            // Assert
            expect(tabItems.lastChildIndex).toBe(-1);
        });

        it('should callback function not called when no children when #forEach called', () => {
            // Arrange
            const mockCallback = jest.fn();

            // Act
            tabItems.forEach(mockCallback);

            // Assert
            expect(mockCallback).not.toHaveBeenCalled();
        });

        it('should #findChildByTabControlId called with 9999 return undefined when no children', () => {
            // Act
            const received = tabItems.findChildByTabControlId(9999);

            // Assert
            expect(received).toBeUndefined();
        });
    });
});