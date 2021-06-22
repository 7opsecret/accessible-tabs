// Component(s):
import TabControl  from '~/src/components/TabControl';
import TabPanel from '~/src/components/TabPanel';

// Service(s):
import { TabItems } from './tab-items';

describe('Services: TabItems', () => {
    const [
        mockChild1,
        mockChild2,
        mockChild3
    ] = [ ...new Array(3) ].map((_, i) => {
        const tabPanelElement = document.createElement('div');
        const tabControlElement = document.createElement('a');
        const tabPanelOptions = {

        };
        const tabControlOptions = {

        };
        return {
            tabPanel: new TabPanel(tabPanelElement, tabPanelOptions),
            tabControl: new TabControl(tabControlElement, tabControlOptions)
        };
    });

    it('should getter: lastChildIndex return 2 when have 3 children', () => {

    });

    it('should #forEach throw error when called without any payload', () => {
        const tabItems = new TabItems();

        expect(tabItems.forEach).toBe('...');
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

    });

    it('should #forEach callback function called N times (total number of children) with all children', () => {

    });

    it('should #addChild add both TabPanel and TabControl instances as children as 1 object', () => {

    });

    it('should #addChild throw error when trying to add invalid data type', () => {

    });

    it('should #addChild throw error when trying to add 1 either one invalid instance', () => {

    });

    it('should #findChildByTabControlId return both TabPanel and TabControl instances when matched found', () => {

    });

    it('should #findChildByTabControlId return both TabPanel and TabControl instances when no matched found', () => {

    });

    it('should #findChildByIndex return child at specified index when specified index is valid', () => {

    });

    it('should #findChildByIndex return xxx when specified index is invalid', () => {

    });

    it('should #findChildIndexByTabControlId return index of matched child when child exist', () => {

    });

    it('should #findChildIndexByTabControlId return xxx of matched child when child exist', () => {

    });

    describe('Before add any children', () => {
        let tabItems;

        beforeAll(() => {
            tabItems = new TabItems();
        });

        it('should getter: noOfChildren return 0 when request counting total number of children', () => {
            expect(tabItems.noOfChildren).toBe(0);
        });

        it('should getter: lastChildIndex return -1 when request last index of children', () => {
            expect(tabItems.lastChildIndex).toBe(-1);
        });

        it('should callback function not called when no children when #forEach called', () => {
            const mockCallback = jest.fn();

            tabItems.forEach(mockCallback);

            expect(mockCallback).not.toHaveBeenCalled();
        });

        it('should #findChildByTabControlId return xxx when no children', () => {
            const received = tabItems.findChildByTabControlId(0);

            expect(received).toBe('...');
        });
    });
});