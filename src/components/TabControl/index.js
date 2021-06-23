import './styles.css';

// Exception(s) Handling:
import { assertHtmlElement } from '~/src/exceptions/assert-htmlelement';

// Util(s):
import { setAttributes } from '~/src/utils/dom';
import { isFunction } from '~/src/utils/assert';

export const TAB_CONTROL_BASE_CLASSNAME = 'tab-control';
const TAB_CONTROL_SELECTED_CLASSNAME = `${TAB_CONTROL_BASE_CLASSNAME}--selected`;
export default class TabControl {
    constructor(
        element,
        {
            associateId,
            defaultSelected,
            id,
            title,
            onClick,
            onKeyUp,
            onKeyDown,
            onFocus
        } = {}
    ) {
        assertHtmlElement(element, '[TabControl] Invalid HTML Element (args[0])');

        this.element     = element;
        this.active      = Boolean(defaultSelected);
        this.associateId = associateId;
        this.element     = element;
        this.id          = id;
        this.title       = title;
        this.onClick     = onClick;
        this.onKeyUp     = onKeyUp;
        this.onKeyDown   = onKeyDown;
        this.onFocus     = onFocus;

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
        this.element.textContent = this.title;
        this.setDefaultCssClasses();
        this.setA11yAttributes();
        this.bindEvents();
    }

    setDefaultCssClasses() {
        let classes = [ TAB_CONTROL_BASE_CLASSNAME ];

        if(this.active) {
            classes.push(TAB_CONTROL_SELECTED_CLASSNAME);
        }

        this.element.classList.add(...classes);
    }

    setA11yAttributes() {
        setAttributes(
            this.element,
            {
                'aria-controls': this.associateId,
                'aria-selected': this.active,
                id: this.id,
                role: 'tab',
                tabindex: this.getTabIndex()
            }
        )
    }

    getTabIndex() {
        return this.active
            ? '0'
            : '-1';
    }

    toggleSelectedChange() {
        this.element.classList.toggle(TAB_CONTROL_SELECTED_CLASSNAME, this.active);
        this.element.setAttribute('tabindex', this.getTabIndex());
        this.element.setAttribute('aria-selected', this.active);
    }

    bindEvents() {
        [
            {
                eventName: 'click',
                handler: this.onClick,
            },
            {
                eventName: 'keyup',
                handler: this.onKeyUp
            },
            {
                eventName: 'keydown',
                handler: this.onKeyDown
            },
            {
                eventName: 'focus',
                handler: this.onFocus
            }
        ].forEach(({ eventName, handler }) => {
            if (isFunction(handler)) {
                this.element.addEventListener(eventName, handler);
            }
        });
    }
}