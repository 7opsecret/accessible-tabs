// Component(s):
import TabControl  from '~/src/components/TabControl';
import TabPanel from '~/src/components/TabPanel';

// Util(s):
import { isFunction } from '~/src/utils/assert';

export class TabItemsService {
    constructor() {
        this.children = [];
    }

    get lastChildIndex() {
        return this.children.length - 1;
    }

    forEach(cb) {
        if(!isFunction(cb)) {
            throw new Error('[TabItemsService] Invalid callback function');
        }
        if (!this.children.length) {
            return;
        }
        this.children.forEach(cb);
    }

    addChild({
        tabControl,
        tabPanel
    } = {}) {
        if (!(tabControl instanceof TabControl)) {
            throw new Error('[TabItemsService] tabControl needs to be instance of TabControl');
        }

        if (!(tabPanel instanceof TabPanel)) {
            throw new Error('[TabItemsService] tabPanel needs to be instance of TabPanel');
        }

        this.children = [
            ...this.children,
            {
                tabControl,
                tabPanel
            }
        ];
    }

    findChildByTabControlId(matchTabControlId) {
        return this.children.find(({ tabControl }) => tabControl?.id === matchTabControlId);
    }

    findChildByIndex(index) {
        return this.children[index];
    }

    findChildIndexByTabControlId(matchTabControlId) {
        return this.children.findIndex(({ tabControl }) => tabControl?.id === matchTabControlId);
    }
}