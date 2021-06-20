// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement';

// Util(s):
import { setAttributes } from '~/src/utils/dom';

export const TAB_PANEL_BASE_CLASSNAME = 'tab-panel';
const TAB_PANEL_SELECTED_CLASSNAME = `${TAB_PANEL_BASE_CLASSNAME}--selected`;

export default class TabPanel {
    constructor(
        element,
        {
            defaultSelected,
            associateId,
            id
        } = {}
    ) {
        assertHtmlElement(element, '[TabPanel] Invalid HTML Element (args[0])');

        this.element     = element;
        this.active      = defaultSelected;
        this.associateId = associateId;
        this.id          = id;

        this.mount();
    }

    get selected() {
        return this.active;
    }

    set selected(isSelected) {
        this.active = isSelected;
        this.toggleSelectedChange();
    }

    mount() {
        this.setDefaultCssClasses();
        this.setA11yAttributes();
    }

    setDefaultCssClasses() {
        let classes = [ TAB_PANEL_BASE_CLASSNAME ];

        if(this.active) {
            classes.push(TAB_PANEL_SELECTED_CLASSNAME);
        }

        this.element.classList.add(...classes);
    }

    setA11yAttributes() {
        setAttributes(
            this.element,
            {
                'aria-labelledby': this.associateId,
                id: this.id,
                role: 'tabpanel',
                tabindex: '0'
            }
        )
        this.element.hidden = !this.active;
    }

    toggleSelectedChange() {
        this.element.classList.toggle(TAB_PANEL_SELECTED_CLASSNAME, this.active);
        this.element.hidden = !this.active;
    }
}